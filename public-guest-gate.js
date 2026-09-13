(()=>{
  const SESSION_KEY='wagstack-supabase-session-v1';
  const GUEST_FLAG='wagstack-guest-mode-v1';
  const nativeGet=Storage.prototype.getItem;
  if(Storage.prototype.__wagPublicGuestGate)return;
  Object.defineProperty(Storage.prototype,'__wagPublicGuestGate',{value:true,configurable:true});
  Storage.prototype.getItem=function(key){
    const value=nativeGet.call(this,key);
    if(this!==localStorage||key!==SESSION_KEY||value)return value;
    let guest=false;
    try{guest=nativeGet.call(localStorage,GUEST_FLAG)==='1'}catch{}
    if(!guest)return value;
    const stack=String(new Error().stack||'');
    if(stack.includes('public-landing.js')){
      return JSON.stringify({user:{id:'guest-local'},guest:true});
    }
    return value;
  };
})();
