(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const home = document.createElement('a');
  home.className = 'deck-home'; home.href = 'index.html'; home.textContent = 'All talks';
  home.setAttribute('aria-label', 'Return to all talks'); document.body.append(home);
  Reveal.initialize({width:1440,height:900,margin:0.04,center:false,hash:true,controls:true,progress:true,slideNumber:'c/t',transition:reduced?'none':'fade',backgroundTransition:reduced?'none':'fade',transitionSpeed:'fast',totalTime:2400,plugins:[RevealNotes],pdfSeparateFragments:false,autoPlayMedia:false,help:true});
})();
