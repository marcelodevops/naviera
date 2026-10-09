import assert from 'node:assert/strict';
import test from 'node:test';
import { demoShipments } from '../src/data/demo/shipments.js';
import {
  cargoNotes,
  cargoTypeNames,
  originNames,
  transitTimes,
} from '../src/data/estimator.js';

test('demo tracking records have a complete timeline', () => {
  assert.equal(Object.keys(demoShipments).length, 4);

  for (const [trackingCode, shipment] of Object.entries(demoShipments)) {
    assert.equal(shipment.bl, trackingCode);
    assert.equal(shipment.stages.length, 6);
    assert.ok(shipment.currentStage >= 0 && shipment.currentStage < shipment.stages.length);
  }
});

test('estimator data covers every displayed origin and cargo type', () => {
  assert.deepEqual(Object.keys(transitTimes), Object.keys(originNames));
  assert.deepEqual(Object.keys(cargoNotes), Object.keys(cargoTypeNames));

  for (const estimate of Object.values(transitTimes)) {
    assert.ok(estimate.nav);
    assert.ok(estimate.po);
    assert.ok(estimate.pd);
    assert.ok(estimate.cu);
    assert.ok(estimate.lm);
    assert.ok(estimate.tot);
  }
});
