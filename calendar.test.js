import test from 'node:test';
import assert from 'node:assert/strict';
import {monthCells,shiftMonth} from './calendar.js';

test('Month view shows each November day once with Monday-first complete weeks',()=>{
 const cells=monthCells('2026-11-18');
 assert.equal(cells.length,42);
 assert.deepEqual(cells.slice(0,6),Array(6).fill(null));
 assert.equal(cells[6],'2026-11-01');
 assert.equal(cells[35],'2026-11-30');
 assert.deepEqual(cells.filter(Boolean),Array.from({length:30},(_,i)=>`2026-11-${String(i+1).padStart(2,'0')}`));
});

test('Calendar handles four/five/six weeks and leap years without DST shifts',()=>{
 assert.equal(monthCells('2027-02-18').length,28);
 assert.equal(monthCells('2026-04-18').length,35);
 assert.equal(monthCells('2026-08-18').length,42);
 assert.equal(monthCells('2028-02-01').filter(Boolean).at(-1),'2028-02-29');
 for(const day of ['2026-03-29','2026-10-25']){
  const dates=monthCells(day).filter(Boolean);
  assert.equal(dates.length,31);assert.equal(new Set(dates).size,31);
 }
});

test('Month navigation preserves the selected day and clamps at shorter months/year boundaries',()=>{
 assert.equal(shiftMonth('2026-11-18',1),'2026-12-18');
 assert.equal(shiftMonth('2026-11-18',-1),'2026-10-18');
 assert.equal(shiftMonth('2026-01-31',1),'2026-02-28');
 assert.equal(shiftMonth('2028-01-31',1),'2028-02-29');
 assert.equal(shiftMonth('2026-12-31',1),'2027-01-31');
 assert.equal(shiftMonth('2027-01-31',-1),'2026-12-31');
});
