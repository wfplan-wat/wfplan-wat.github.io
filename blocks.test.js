import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {blockNumber,blockStart,blockLabel} from './blocks.js';
const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));

test('Teaching-hour pairs display as numbered blocks with the provided start times',()=>{
 for(const [hours,number,time] of [['1–2',1,'08:00'],['3–4',2,'09:50'],['5–6',3,'11:40'],['7–8',4,'13:30']]){
  const e={block:hours};assert.equal(blockNumber(e),number);assert.equal(blockStart(e),time);assert.equal(blockLabel(e),`${number} (${time})`);
 }
 assert.equal(blockLabel({block:'7-8'}),'4 (13:30)');
 assert.equal(blockLabel({block:'7 − 8'}),'4 (13:30)');
});

test('All real source pairs have a block number; missing fifth-block time is explicit',()=>{
 for(const e of data.events)assert.ok(Number.isInteger(blockNumber(e)),e.block);
 assert.equal(blockNumber({block:'9–10'}),5);
 assert.equal(blockStart({block:'9–10'}),null);
 assert.equal(blockLabel({block:'9–10'}),'5 (brak godziny)');
 for(const block of ['',undefined,'2–3','3–5','0–1'])assert.equal(blockNumber({block}),null);
});
