/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {CloudAnalyticsImplementation} from './implementation/cloud_analytics';
import {ClientInfo} from './client_info';
import {NodeLogRequestTransmitter} from './network/node';
import {DEFAULT_CLIENT_INFO, LOGGING_ENDPOINT_HOSTNAME, LOGGING_ENDPOINT_PATH} from './constants';
import {BatchEventFlushingStrategy} from './event_flushing/batch_event_flushing_strategy';
import {NodeEventsFlushingStrategy} from './event_flushing/node_events';

/**
 * Handles logging of events to Concord in a browser environment.
 */
export class CloudAnalytics extends CloudAnalyticsImplementation {
  /**
   * The constructor of Cloud Analytics.
   *
   * @param consoleType The console type of the log.
   * @param apiKey The API Key to use when logging events to Firelog
   * @param clientInfo The client info about the device.
   */
  constructor(consoleType: string,
              apiKey: string,
              clientInfo: ClientInfo = DEFAULT_CLIENT_INFO) {
    const requestTransmitter = new NodeLogRequestTransmitter(LOGGING_ENDPOINT_HOSTNAME, LOGGING_ENDPOINT_PATH, apiKey);

    const flushingHandlers: BatchEventFlushingStrategy[] = [];
    flushingHandlers.push(new NodeEventsFlushingStrategy());

    super(consoleType, clientInfo, requestTransmitter, flushingHandlers);
  }
}