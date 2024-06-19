import type { Plugin, PluginOptions } from 'grapesjs';
import { loadScripts } from './dom';

export type GrapesPlugins = string | Plugin<any>;

export type PluginTypeToLoad = (GrapesPlugins | PluginToLoad | false | null | undefined);

export type PluginToLoad = {
    id: string,
    src: string,
    options?: PluginOptions,
}

const isPluginToLoad = (plugin: PluginTypeToLoad): plugin is PluginToLoad => {
    return !!(plugin && !Array.isArray(plugin) && typeof plugin === 'object');
  }

export async function loadPlugins(plugins: PluginToLoad[]) {
    const scripts = plugins.map(({ id, src }) => ({ id, src }));
    const pluginsMap = plugins.reduce((res, item) => {
        res[item.id] = item;
        return res;
    }, {} as Record<string, PluginToLoad>);
    const loaded: PluginToLoad[] = [];
    const failed: PluginToLoad[] = [];

    const results = await loadScripts(scripts);
    results?.forEach(result => {
        if (!result) return;
        
        const pluginToLoad = pluginsMap[result.status === 'fulfilled' ? result.value : result.reason];
        if (pluginToLoad) { // Check if the pluginToLoad is not undefined
            if (result.status === 'fulfilled') {
                loaded.push(pluginToLoad);
            } else {
                failed.push(pluginToLoad);
            }
        }
    })

    return { loaded, failed };
}

export const initPlugins = async (plugins: PluginTypeToLoad[]) => {
    const pluginsToInit = [ ...plugins ];
    const pluginOptions: PluginToLoad['options'] = {};

    if (pluginsToInit.length) {
      const pluginToLoadMap: Record<string, { index: number, loaded?: boolean }> = {};
      const pluginsToLoad: PluginToLoad[] = [];

      pluginsToInit.forEach((plugin, index) => {
          if (plugin && isPluginToLoad(plugin)) {
              pluginToLoadMap[plugin.id] = { index }
              pluginsToLoad.push(plugin);
          }
      });

      if (pluginsToLoad.length) {
        const { loaded } = await loadPlugins(pluginsToLoad);
        loaded.forEach(({ id, options }) => {
          if (pluginToLoadMap?.[id]?.loaded) {
            (pluginToLoadMap[id] as { loaded: boolean }).loaded = true;
          }
          pluginOptions[id] = options ?? {};
        });
      }

      Object.keys(pluginToLoadMap).forEach(id => {
        const plugin = pluginToLoadMap[id];
        if (plugin?.loaded) {
          pluginsToInit[plugin.index] = id;
        } else {
          pluginsToInit[plugin?.index ?? 0] = false;
        }
      })
    }

    return {
      plugins: pluginsToInit.filter(Boolean) as GrapesPlugins[],
      pluginOptions,
    }
  }