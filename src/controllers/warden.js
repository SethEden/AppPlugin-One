/**
 * @file warden.js
 * @module warden
 * @description Contains all the functions to manage the entire plugin at the highest level.
 * Also provides an interface to easily manage all the plugin features & various functionaity from a single entry point.
 * @requires module:plugin.constants
 * @requires module:chiefCommander
 * @requires module:chiefData
 * @requires module:chiefRules
 * @requires {@link https://www.npmjs.com/package/@haystacks/async|@haystacks/async}
 * @requires {@link https://www.npmjs.com/package/@haystacks/constants|@haystacks/constants}
 * @requires {@link https://www.npmjs.com/package/path|path}
 * @author Seth Hollingsead
 * @date 2022/09/06
 * @copyright Copyright © 2022-… by Seth Hollingsead. All rights reserved
 */

// Internal imports
import * as plg from '../constants/plugin.constants.js';
import chiefCommander from './chiefCommander.js';
import chiefData from './chiefData.js'
import chiefRules from '../controllers/chiefRules.js';
import D from '../structures/pluginData.js';
// External imports
import haystacks from '@haystacks/async';
import hayConst from '@haystacks/constants';
import path from 'path';

const {bas, msg, wrd} = hayConst;
const baseFileName = path.basename(import.meta.url, path.extname(import.meta.url));
// pluginOne.brokers.ruleBroker.
const namespacePrefix = plg.cpluginName + bas.cDot + wrd.cbrokers + bas.cDot + baseFileName + bas.cDot;

/**
 * @function initPluginData
 * @description Setup all of the plugin data and configuration settings.
 * @param {object} configData All of the configuration data and paths that should be parsed as part of the setup process.
 * @return {object} All of the plugin data that should be returned to the rest of the framework.
 * @author Seth Hollingsead
 * @date 2022/09/06
 */
async function initPluginData(configData) {
  let functionName = initPluginData.name;
  // await haystacks.consoleLog(namespacePrefix, functionName, msg.cBEGIN_Function);
  console.log(`BEGIN ${namespacePrefix}${functionName} function`);
  // await haystacks.consoleLog(namespacePrefix, functionName, msg.cconfigDataIs + JSON.stringify(configData));
  console.log(`configData is: ${JSON.stringify(configData)}`);
  let pluginConfigPath = configData[cfg.cpluginConfigReferencePath];
  
  await chiefData.initializeData();
  await chiefData.loadConfigurationData();
  await chiefRules.initBusinessRules();
  await chiefCommander.initCommands();
  console.log('contents of D are: ' + JSON.stringify(D));
  // await haystacks.consoleLog(namespacePrefix, functionName, msg.cEND_Function);
  console.log(`END ${namespacePrefix}${functionName} function`);
}

export default {
  initPluginData
}