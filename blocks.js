// Source event.block contains teaching-hour pairs, not numbered blocks.
// Start times stay keyed by the first teaching hour for scheduling compatibility.
export const BLOCK_STARTS={1:'08:00',3:'09:50',5:'11:40',7:'13:30'};
export const blockStart=e=>BLOCK_STARTS[parseInt(e.block)]||null;

export function blockNumber(e){
 const pair=/^(\d+)\s*[–−-]\s*(\d+)$/.exec(String(e.block||''));
 if(!pair)return null;
 const first=Number(pair[1]);
 return first>=1&&first%2===1&&Number(pair[2])===first+1?(first+1)/2:null;
}

export function blockLabel(e){
 const number=blockNumber(e),start=blockStart(e);
 return number===null?'—':`${number} (${start||'brak godziny'})`;
}
