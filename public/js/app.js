function dayKey(n){return 'dl-day-'+n;}
function markDone(n){localStorage.setItem(dayKey(n),'1');refreshProgress();}
function unmark(n){localStorage.removeItem(dayKey(n));refreshProgress();}
function isDone(n){return !!localStorage.getItem(dayKey(n));}
function refreshProgress(){
  var dones=0,total=28;
  for(var i=1;i<=28;i++) if(isDone(i)) dones++;
  document.querySelectorAll('.progressbar i').forEach(function(e){e.style.width=(dones/total*100)+'%';});
  document.querySelectorAll('[data-progress-text]').forEach(function(e){e.textContent=dones+' / 28 天 · '+Math.round(dones/total*100)+'%';});
  document.querySelectorAll('.daylink').forEach(function(a){
    var d=parseInt(a.getAttribute('data-day')); if(isDone(d)) a.classList.add('done'); else a.classList.remove('done');
  });
  var b=document.querySelector('[data-checkin-btn]');
  if(b){var cur=parseInt(b.getAttribute('data-day')); b.textContent=isDone(cur)?'✓ 已完成，点击取消打卡':'完成本日学习打卡';}
}
document.addEventListener('DOMContentLoaded',function(){
  refreshProgress();
  var b=document.querySelector('[data-checkin-btn]');
  if(b){b.addEventListener('click',function(){
    var cur=parseInt(b.getAttribute('data-day'));
    if(isDone(cur)) unmark(cur); else {markDone(cur); alert('太棒了！第 '+cur+' 天已打卡');}
    refreshProgress();
  });}
  document.querySelectorAll('.quiz').forEach(function(q){
    var ans=q.getAttribute('data-ans');
    var exp=q.querySelector('.explain');
    q.querySelectorAll('button.opt').forEach(function(btn){
      btn.addEventListener('click',function(){
        q.querySelectorAll('button.opt').forEach(function(x){x.classList.remove('correct','wrong');});
        if(btn.getAttribute('data-k')===ans){btn.classList.add('correct');}
        else{btn.classList.add('wrong');q.querySelector('button.opt[data-k="'+ans+'"]').classList.add('correct');}
        if(exp) exp.style.display='block';
      });
    });
  });
  document.querySelectorAll('.figure img').forEach(function(img){
    img.addEventListener('click',function(){
      var lb=document.getElementById('lightbox');
      lb.querySelector('img').src=img.src;
      lb.style.display='flex';
    });
  });
  var lb=document.getElementById('lightbox');
  if(lb) lb.addEventListener('click',function(){lb.style.display='none';});
});
