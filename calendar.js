const pad=n=>String(n).padStart(2,'0');

// Monday-first, complete weeks; empty cells belong to the adjacent months.
export function monthCells(day){
 const [year,month]=day.split('-').map(Number);
 const offset=(new Date(Date.UTC(year,month-1,1)).getUTCDay()+6)%7;
 const count=new Date(Date.UTC(year,month,0)).getUTCDate();
 return Array.from({length:Math.ceil((offset+count)/7)*7},(_,i)=>{
  const date=i-offset+1;
  return date<1||date>count?null:`${year}-${pad(month)}-${pad(date)}`;
 });
}

export function shiftMonth(day,amount){
 const [year,month,date]=day.split('-').map(Number);
 const target=new Date(Date.UTC(year,month-1+amount,1));
 const y=target.getUTCFullYear(),m=target.getUTCMonth();
 const last=new Date(Date.UTC(y,m+1,0)).getUTCDate();
 return `${y}-${pad(m+1)}-${pad(Math.min(date,last))}`;
}
