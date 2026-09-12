(()=>{
const MAP={
'Cloud Coat Shampoo':'https://images.pexels.com/photos/19021958/pexels-photo-19021958.jpeg?auto=compress&cs=tinysrgb&w=640',
'Daily Slicker Brush':'https://images.pexels.com/photos/19145879/pexels-photo-19145879.jpeg?auto=compress&cs=tinysrgb&w=640',
'Paw Barrier Balm':'https://images.pexels.com/photos/5993639/pexels-photo-5993639.jpeg?auto=compress&cs=tinysrgb&w=640',
'Daily Probiotic Bites':'https://images.pexels.com/photos/13419673/pexels-photo-13419673.jpeg?auto=compress&cs=tinysrgb&w=640',
'Dental Chews':'https://images.pexels.com/photos/28532086/pexels-photo-28532086.jpeg?auto=compress&cs=tinysrgb&w=640',
'Calming Mist':'https://images.pexels.com/photos/28921814/pexels-photo-28921814.jpeg?auto=compress&cs=tinysrgb&w=640',
'Treat Puzzle Toy':'https://images.pexels.com/photos/7017660/pexels-photo-7017660.jpeg?auto=compress&cs=tinysrgb&w=640',
'Foldaway Travel Bowl':'https://images.pexels.com/photos/27046439/pexels-photo-27046439.jpeg?auto=compress&cs=tinysrgb&w=640'
};
function apply(){if(location.pathname!='/shop')return;document.querySelectorAll('.v27-product').forEach(card=>{const name=card.querySelector('h3')?.textContent?.trim();const img=card.querySelector('.v32-product-photo');if(name&&img&&MAP[name]&&img.src!==MAP[name]){img.src=MAP[name];img.alt=name;}})}
apply();new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.body,{childList:true,subtree:true});addEventListener('popstate',apply);addEventListener('hashchange',apply);
})();