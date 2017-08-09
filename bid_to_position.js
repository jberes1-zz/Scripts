// Copyright 2015, Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @name Bid To Position
 *
 * @overview The Bid To Position script adjusts your bids and allows you to
 *     steer ads in an advertiser account into a desired position in the search
 *     results. See
 *     https://developers.google.com/adwords/scripts/docs/solutions/bid-to-position
 *     for more details.
 *
 * @author AdWords Scripts Team [adwords-scripts@googlegroups.com]
 *
 * @version 1.0.1
 *
 * @changelog
 * - version 1.0.1
 *   - Refactored to improve readability. Added documentation.
 * - version 1.0
 *   - Released initial version.
 */

// Ad position you are trying to achieve.
var TARGET_AVERAGE_POSITION = 1;

// Once the keywords fall within TOLERANCE of TARGET_AVERAGE_POSITION,
// their bids will no longer be adjusted.
var TOLERANCE = 0.1;

// How much to adjust the bids.
var BID_ADJUSTMENT_COEFFICIENT = 1.05;

/**
 * Main function that lowers and raises keywords' CPC to move closer to
 * target position.
 */
function main() {
  raiseKeywordBids();
  lowerKeywordBids();
}

/**
 * Increases the CPC of keywords that are below the target position.
 */
function raiseKeywordBids() {
  var keywordsToRaise = getKeywordsToRaise();

  while (keywordsToRaise.hasNext()) {
    var keyword = keywordsToRaise.next();
    keyword.bidding().setCpc(getIncreasedCpc(keyword.bidding().getCpc()));
  }
}

/**
 * Decreases the CPC of keywords that are above the target position.
 */
function lowerKeywordBids() {
  var keywordsToLower = getKeywordsToLower();

  while (keywordsToLower.hasNext()) {
    var keyword = keywordsToLower.next();
    keyword.bidding().setCpc(getDecreasedCpc(keyword.bidding().getCpc()));
  }
}

/**
 * Increases a given CPC using the bid adjustment coefficient.
 * @param {number} cpc - the CPC to increase
 * @return {number} the new CPC
 */
function getIncreasedCpc(cpc) {
  return cpc * BID_ADJUSTMENT_COEFFICIENT;
}

/**
 * Decreases a given CPC using the bid adjustment coefficient.
 * @param {number} cpc - the CPC to decrease
 * @return {number} the new CPC
 */
function getDecreasedCpc(cpc) {
  return cpc / BID_ADJUSTMENT_COEFFICIENT;
}

/**
 * Gets an iterator of the keywords that need to have their CPC raised.
 * @return {Iterator} an iterator of the keywords
 */
function getKeywordsToRaise() {
  // Condition to raise bid: Average position is greater (worse) than
  // target + tolerance
  return AdWordsApp.keywords()
      .withCondition('Status = ENABLED')
      .withCondition(
          'AveragePosition > ' + (TARGET_AVERAGE_POSITION + TOLERANCE))
      .orderBy('AveragePosition ASC')
      .forDateRange('LAST_7_DAYS')
      .get();
}

/**
 * Gets an iterator of the keywords that need to have their CPC lowered.
 * @return {Iterator} an iterator of the keywords
 */
function getKeywordsToLower() {
  // Conditions to lower bid: Ctr greater than 1% AND
  // average position better (less) than target - tolerance
  return AdWordsApp.keywords()
      .withCondition('Ctr > 0.01')
      .withCondition(
          'AveragePosition < ' + (TARGET_AVERAGE_POSITION - TOLERANCE))
      .withCondition('Status = ENABLED')
      .orderBy('AveragePosition DESC')
      .forDateRange('LAST_7_DAYS')
      .get();
}
