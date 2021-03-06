/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

let whitelistsByProject: ?Map<string, Set<string>> = null;

/**
 * This module helps gradually rolling out changes to the code generation by
 * gradually enabling more buckets representing randomly distributed artifacts.
 */
function set(newWhitelistsByProject: Map<string, Set<string>>) {
  whitelistsByProject = newWhitelistsByProject;
}

function check(project: string, key: string) {
  if (whitelistsByProject == null) {
    return true;
  }
  const whitelist = whitelistsByProject.get(project);
  if (whitelist == null) {
    return true;
  }
  return whitelist.has(key);
}

module.exports = {
  set,
  check,
};
