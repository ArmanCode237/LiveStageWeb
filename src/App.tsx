import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { siteConfig } from './siteConfig';

type IconName = 'arrow' | 'arrowUp' | 'wave' | 'play' | 'layers' | 'sliders' | 'wifi' | 'grid' | 'headphones' | 'heart' | 'code' | 'menu' | 'close' | 'chevron' | 'check' | 'external' | 'spark' | 'monitor' | 'globe' | 'cpu';

function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const shapes: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
    wave: <path d="M2 13h4l3-9 5 16 3-8h5"/>,
    play: <path d="m8 5 12 7-12 7V5Z"/>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    sliders: <><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="3" fill="currentColor" stroke="none"/></>,
    wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M9 17a4 4 0 0 1 6 0"/><circle cx="12" cy="21" r="1" fill="currentColor" stroke="none"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    headphones: <><path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="13" width="5" height="8" rx="2"/><rect x="16" y="13" width="5" height="8" rx="2"/></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    check: <path d="m5 12 5 5L20 7"/>,
    external: <><path d="M13 5h6v6M19 5 9 15"/><path d="M19 13v6H5V5h6"/></>,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    cpu: <><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 2v5m6-5v5M9 17v5m6-5v5M2 9h5m-5 6h5m10-6h5m-5 6h5"/></>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>;
}

const navItems = [
  { to: '/', title: 'Inicio', end: true },
  { to: '/live-stage', title: 'Instrumento' },
  { to: '/osc-live-stage', title: 'Control OSC' },
  { to: '/proyecto', title: 'El proyecto' },
] as const;

function Brand() {
  return <Link className="brand" to="/" aria-label="Live Stage, volver al inicio">
    <span className="brand-mark"><Icon name="wave" size={25}/></span>
    <span className="brand-words"><span>LIVE<span className="brand-gap"> </span>STAGE</span><small>PERFORMANCE ECOSYSTEM</small></span>
  </Link>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);
  return <header className="site-header">
    <div className="header-inner wrap">
      <Brand />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal" id="main-navigation">
        {navItems.map(item => <NavLink key={item.to} to={item.to} end={'end' in item ? item.end : false} className={({isActive}) => `nav-link${isActive ? ' is-active' : ''}`}>{item.title}</NavLink>)}
        <NavLink to="/apoyar" className={({isActive}) => `nav-link nav-support${isActive ? ' is-active' : ''}`}><Icon name="heart" size={15} /> Apoyar proyecto</NavLink>
      </nav>
      <button type="button" className="mobile-trigger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(x => !x)}><Icon name={open ? 'close' : 'menu'} size={23}/></button>
    </div>
  </header>;
}
function Footer() {
  return <footer className="footer">
    <div className="wrap footer-top">
      <div className="footer-lead"><Brand /><p>Herramientas hechas para quienes crean, interpretan y controlan música en directo.</p></div>
      <div className="footer-links"><h3>Explorar</h3><Link to="/live-stage">Live Stage</Link><Link to="/osc-live-stage">OSC Live Stage</Link><Link to="/proyecto">El proyecto</Link></div>
      <div className="footer-links"><h3>Comunidad</h3><Link to="/apoyar">Apoyar desarrollo</Link><Link to="/proyecto#roadmap">Próximos pasos</Link><span>Hecho para músicos</span></div>
    </div>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Live Stage. Proyecto independiente.</span><span>Instrumentos · Música · Tecnología</span></div>
  </footer>;
}
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Al cambiar de ruta, esperamos a que React haya renderizado el destino.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}));
    } else window.scrollTo({top:0, behavior:'instant'});
  }, [pathname, hash]);
  return null;
}
function PageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} · Live Stage`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content',description);
  }, [title, description]);
  return null;
}
function ButtonLink({ to, children, secondary = false, small = false, className = '' }: { to: string; children: ReactNode; secondary?: boolean; small?: boolean; className?: string }) {
  return <Link to={to} className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${small ? 'button-small' : ''} ${className}`}>{children} <Icon name="arrowUp" size={17}/></Link>;
}
function SectionIntro({ index, eyebrow, title, subtitle }: { index: string; eyebrow: string; title: string; subtitle?: string }) {
  return <div className="section-intro"><div className="eyebrow"><span className="eyebrow-num">{index}</span> {eyebrow}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}
function WaveDecor({ subtle = false }: {subtle?: boolean}) {
  return <svg className={`wave-decor${subtle ? ' subtle' : ''}`} viewBox="0 0 980 178" preserveAspectRatio="none" aria-hidden="true"><path d="M0 87 H92 L120 87 L147 48 L176 135 L204 24 L244 148 L277 64 L298 94 L329 80 L359 87 L390 87 L420 47 L452 123 L482 10 L514 164 L546 47 L576 89 H618 L652 61 L675 104 L704 75 L738 87 H980" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M0 87 H92 L120 87 L147 48 L176 135 L204 24 L244 148 L277 64 L298 94 L329 80 L359 87 L390 87 L420 47 L452 123 L482 10 L514 164 L546 47 L576 89 H618 L652 61 L675 104 L704 75 L738 87 H980" fill="none" stroke="currentColor" strokeWidth="10" opacity=".10"/></svg>;
}
function ProductVisual() {
  return <div className="hero-visual" aria-label="Vista de la interfaz real de Live Stage">
    <div className="hero-halo"/>
    <div className="visual-caption"><span className="status-light"/> LIVE STAGE / INSTRUMENT WORKSTATION <span>01 / 02</span></div>
    <div className="screen-frame"><div className="screen-top"><span/><span/><span/><b>PERFORMANCE / STAGE WORKSTATION</b></div><img src="/media/perform.png" alt="Captura del panel Performance de Live Stage" width="1600" height="990" /></div>
    <div className="float-tag float-tag-1"><Icon name="layers" size={18}/><span>03 MOTORES DE SONIDO</span></div>
    <div className="float-tag float-tag-2"><span className="dot-green"/> DSP / C++ ENGINE</div>
  </div>;
}
function Home() {
  return <>
    <PageMeta title="Inicio" description="Live Stage: un ecosistema de software para crear sonidos y controlar la música en directo. Conoce Live Stage y OSC Live Stage."/>
    <main>
      <section className="hero-section"><div className="hero-grid wrap">
        <div className="hero-copy"><div className="kicker"><span className="pulse"/> NUEVA GENERACIÓN DE HERRAMIENTAS MUSICALES <span className="kicker-line"/></div>
          <h1>Tu sonido.<br/><span>Tu escenario.</span><br/>Sin límites.</h1>
          <p>Un ecosistema diseñado para quienes viven la música en directo. Instrumentos virtuales, control inteligente y una experiencia hecha para tocar, no para detenerte a configurar.</p>
          <div className="hero-actions"><ButtonLink to="/live-stage">Explorar Live Stage</ButtonLink><ButtonLink to="/osc-live-stage" secondary>Conocer OSC Live Stage</ButtonLink></div>
          <div className="hero-caption"><div className="avatar-symbol"><Icon name="wave" size={17}/></div><span>Dos productos independientes.<br/><strong>Una misma visión del escenario.</strong></span></div>
        </div>
        <ProductVisual />
      </div><div className="hero-bottom wrap"><span>01 / 04 &nbsp;—&nbsp; LA EXPERIENCIA LIVE STAGE</span><span>DESPLAZA PARA EXPLORAR <span className="down-arrow">↓</span></span></div></section>
      <section className="section section-products wrap" id="productos">
        <SectionIntro index="01" eyebrow="NUESTRO ECOSISTEMA" title="Dos herramientas. Un mismo lenguaje." subtitle="Distintos propósitos, una identidad compartida: diseñadas alrededor del músico y su forma de trabajar." />
        <div className="product-grid">
          <Link to="/live-stage" className="product-card product-card-stage"><div className="product-head"><span className="product-index">PRODUCTO / 01</span><span className="product-type"><Icon name="headphones" size={15}/> INSTRUMENTO VIRTUAL</span></div><div className="product-card-content"><span className="card-kicker">EL SONIDO ES TUYO</span><h3>Live <em>Stage</em></h3><p>Una workstation virtual para tocar en vivo con tres motores de sonido, capas independientes, efectos y control de interpretación.</p><span className="product-cta">Descubrir instrumento <Icon name="arrowUp" size={19}/></span></div><div className="product-card-image"><img src="/media/perform.png" alt="Vista del instrumento Live Stage" loading="lazy"/></div></Link>
          <Link to="/osc-live-stage" className="product-card product-card-osc"><div className="product-head"><span className="product-index">PRODUCTO / 02</span><span className="product-type"><Icon name="wifi" size={15}/> CONTROL DE RED</span></div><div className="product-card-content"><span className="card-kicker">EL CONTROL VA CONTIGO</span><h3>OSC <em>Live Stage</em></h3><p>Superficie configurable para OSC bidireccional por red y MIDI por USB o Bluetooth, con escenas y controles adaptables.</p><span className="product-cta">Conocer el proyecto <Icon name="arrowUp" size={19}/></span></div><div className="product-card-image product-card-image-osc"><img src="/media/osc-live.png" alt="Captura de OSC Live Stage: faders, knobs y controles de la aplicación" loading="lazy"/></div></Link>
        </div>
      </section>
      <section className="section philosophy-section"><div className="wrap philosophy-grid"><div><div className="eyebrow"><span className="eyebrow-num">02</span> UNA IDEA, DOS ENFOQUES</div><h2>Menos fricción.<br/><span>Más música.</span></h2></div><div className="philosophy-copy"><p>El escenario exige respuestas inmediatas. Por eso cada elemento de Live Stage persigue un objetivo claro: que la tecnología siga tu interpretación, y nunca al revés.</p><div className="philosophy-list"><span><Icon name="check" size={18}/> Diseñado para presentaciones en vivo</span><span><Icon name="check" size={18}/> Interfaces claras y controles directos</span><span><Icon name="check" size={18}/> Proyectos en evolución constante</span></div></div></div><WaveDecor subtle/></section>
      <section className="section wrap section-technology"><SectionIntro index="03" eyebrow="BAJO EL PANEL" title="Tecnología al servicio de la interpretación."/><div className="three-features"><div className="feature"><span className="feature-icon"><Icon name="cpu"/></span><h3>Audio en tiempo real</h3><p>El instrumento Live Stage utiliza un motor C++ separado de la interfaz para procesamiento de audio y MIDI.</p></div><div className="feature"><span className="feature-icon"><Icon name="sliders"/></span><h3>Diseño de precisión</h3><p>Controles inspirados en equipos de escenario, superficies metálicas, displays y estados visuales inmediatos.</p></div><div className="feature"><span className="feature-icon"><Icon name="globe"/></span><h3>Conectividad creativa</h3><p>OSC Live Stage incorpora superficies configurables, comunicación OSC por UDP y opciones MIDI para distintas plataformas.</p></div></div></section>
      <section className="section wrap"><div className="end-banner"><div><span className="card-kicker">¿TE INTERESA EL PROYECTO?</span><h2>Lo mejor aún<br/>está por sonar.</h2><p>Conoce hacia dónde va Live Stage y cómo puedes apoyar su desarrollo.</p><ButtonLink to="/apoyar">Apoyar el desarrollo</ButtonLink></div><div className="end-banner-decoration" aria-hidden="true"><div className="ring ring-1"/><div className="ring ring-2"/><div className="ring ring-3"/><span>LIVE<br/>STAGE</span></div></div></section>
    </main>
  </>;
}
const featuresStage = [
  { icon:'layers' as IconName, value:'05', label:'Capas de piano', info:'Varias capas de sonidos en un único módulo.'},
  { icon:'wave' as IconName, value:'04', label:'Capas de sintetizador', info:'Síntesis organizada para interpretaciones complejas.'},
  { icon:'sliders' as IconName, value:'04', label:'Racks de efectos', info:'Piano, sintetizador, órgano y salida master.'},
  { icon:'grid' as IconName, value:'08', label:'Programas', info:'Acceso rápido a memorias para el escenario.'},
];
function LiveStage() {
  const gallery = [
    { src:'/media/perform.png', title:'Performance', kicker:'VISTA PRINCIPAL'},
    { src:'/media/piano.png', title:'Piano', kicker:'CAPAS Y SONIDOS'},
    { src:'/media/synth.png', title:'Synth', kicker:'SÍNTESIS Y EDICIÓN'},
    { src:'/media/organ.png', title:'Organ', kicker:'TONEWHEEL / ROTARY'},
  ];
  const [selected, setSelected] = useState(0);
  return <><PageMeta title="Live Stage · Instrumento virtual"/><main>
    <section className="page-hero stage-page-hero"><div className="wrap"><div className="breadcrumb"><Link to="/">ECOSISTEMA</Link> <span>/</span> INSTRUMENTO VIRTUAL</div><div className="page-hero-grid"><div><span className="tag-accent"><span className="tiny-dot"/> SOFTWARE MUSICAL / WINDOWS</span><h1>Un escenario.<br/><span>Todos tus sonidos.</span></h1><p>Live Stage reúne piano, sintetizador y órgano en una workstation diseñada para interpretar, combinar sonidos y dar forma a tu propio setup.</p><div className="hero-actions"><a href="#explorar" className="button button-primary">Explorar el instrumento <Icon name="arrow" size={17}/></a><ButtonLink to="/proyecto" secondary>Sobre el desarrollo</ButtonLink></div></div><div className="page-hero-mark"><div className="huge-symbol"><Icon name="wave" size={140}/></div><span>ENGINE · DSP · PERFORMANCE</span></div></div></div></section>
    <section className="wrap spec-grid-section"><div className="spec-grid">{featuresStage.map(f => <div className="spec" key={f.label}><span className="spec-icon"><Icon name={f.icon} size={20}/></span><div className="spec-value">{f.value}<span> / </span></div><h3>{f.label}</h3><p>{f.info}</p></div>)}</div></section>
    <section className="section wrap" id="explorar"><SectionIntro index="01" eyebrow="UN SISTEMA, MUCHAS POSIBILIDADES" title="Todo comienza en Performance." subtitle="Capturas actualizadas de Perform, Piano, Synth y Organ tomadas de la última versión adjunta, en modo de vista previa sin motor de audio conectado."/><div className="gallery-shell"><div className="gallery-top"><div><span>INTERFAZ LIVE STAGE</span><strong>{gallery[selected].kicker} / {gallery[selected].title.toUpperCase()}</strong></div><span className="gallery-page">0{selected + 1} — 04</span></div><img className="gallery-main" src={gallery[selected].src} alt={`Captura del módulo ${gallery[selected].title} de Live Stage`} width="1600" height="990"/><div className="gallery-tabs" role="group" aria-label="Seleccionar vista de Live Stage">{gallery.map((item,i)=><button key={item.title} className={selected === i?'is-current':''} type="button" onClick={()=>setSelected(i)} aria-pressed={selected === i}><span>0{i+1}</span> {item.title}</button>)}</div></div></section>
    <section className="section wrap"><div className="split-intro"><div><div className="eyebrow"><span className="eyebrow-num">02</span> ARQUITECTURA DE SONIDO</div><h2>Tres motores.<br/><span>Una sola interpretación.</span></h2></div><p>Piano, Synth y Organ funcionan como módulos independientes que se mezclan en un master estéreo. Cada instrumento dispone de su propio rack de efectos.</p></div><div className="signal-flow"><div className="flow-inputs">{['PIANO','SYNTH','ORGAN'].map((n,i)=><div className="flow-module" key={n}><span>0{i+1}</span><strong>{n}</strong><small>FX RACK</small></div>)}</div><div className="signal-line"/><div className="flow-output"><Icon name="sliders" size={27}/><span>MASTER MIXER</span><small>STEREO OUT</small></div></div></section>
    <section className="section wrap"><div className="info-panel"><div><div className="eyebrow"><span className="eyebrow-num">03</span> DESARROLLO</div><h2>Hecho para músicos exigentes.</h2><p>Live Stage es un proyecto en desarrollo. Las capturas y funciones descritas reflejan la versión del proyecto analizada; algunas capacidades pueden cambiar.</p></div><ButtonLink to="/proyecto" secondary>Conocer el proyecto</ButtonLink></div></section>
  </main></>;
}
function OscPreview() {
  const [mode, setMode] = useState<'live' | 'editor'>('live');
  const modes = {
    live: { src: '/media/osc-live.png', title: 'Modo Live', description: 'Controles configurados y listos para utilizarse como superficie de control.' },
    editor: { src: '/media/osc-editor.png', title: 'Modo edición', description: 'Herramientas para incorporar y organizar faders, knobs, toggles y pads.' },
  };
  const current = modes[mode];
  return <figure className="osc-product-preview">
    <div className="osc-product-preview__head"><span><span className="dot-green"/> OSC LIVE STAGE / INTERFAZ REAL</span><span>CAPTURAS DEL PROYECTO</span></div>
    <img src={current.src} alt={`Interfaz de OSC Live Stage — ${current.title}`} width="780" height="660" />
    <figcaption className="osc-product-preview__footer">
      <span><strong>{current.title}</strong><small>{current.description}</small></span>
      <span className="osc-preview-switch" role="group" aria-label="Mostrar pantallas OSC">
        <button type="button" onClick={()=>setMode('live')} aria-pressed={mode==='live'} className={mode==='live'?'active':''}>LIVE</button>
        <button type="button" onClick={()=>setMode('editor')} aria-pressed={mode==='editor'} className={mode==='editor'?'active':''}>EDITOR</button>
      </span>
    </figcaption>
  </figure>;
}
function OscStage() {
  return <><PageMeta title="OSC Live Stage · Control por red"/><main>
    <section className="page-hero osc-page-hero"><div className="wrap"><div className="breadcrumb"><Link to="/">ECOSISTEMA</Link><span>/</span> CONTROL OSC</div><div className="osc-hero-grid"><div className="osc-hero-text"><span className="tag-accent cyan"><span className="tiny-dot"/> VERSIÓN ALPHA / EN DESARROLLO</span><h1>El control<br/>va <span>contigo.</span></h1><p>OSC Live Stage es una aplicación independiente que permite crear superficies de control para DAW mediante OSC/UDP bidireccional y MIDI, con escenas y controles personalizables.</p><div className="osc-chips"><span><Icon name="wifi" size={15}/> OSC / NETWORK</span><span><Icon name="monitor" size={15}/> WINDOWS / ANDROID</span><span><Icon name="sliders" size={15}/> USB / BLE MIDI</span></div><a className="button button-secondary" href="#concepto">Ver funciones reales <Icon name="arrow" size={18}/></a></div><OscPreview/></div></div></section>
    <section className="section wrap" id="concepto"><SectionIntro index="01" eyebrow="DEL SOFTWARE AL CONTROL" title="Superficies que se adaptan a ti." subtitle="Esta aplicación es independiente del instrumento Live Stage: permite configurar escenas, páginas y controles para enviar mensajes OSC o MIDI desde los dispositivos compatibles."/><div className="three-features"><div className="feature"><span className="feature-icon cyan-icon"><Icon name="wifi"/></span><h3>Control por OSC</h3><p>Envío y recepción OSC mediante UDP, con rutas configurables y feedback de parámetros.</p></div><div className="feature"><span className="feature-icon cyan-icon"><Icon name="sliders"/></span><h3>Superficie configurable</h3><p>Faders, knobs, botones y pads, con escenas, páginas editables y temas visuales.</p></div><div className="feature"><span className="feature-icon cyan-icon"><Icon name="monitor"/></span><h3>Compañero de escenario</h3><p>Opciones MIDI por USB y Bluetooth LE según las capacidades y permisos de cada plataforma.</p></div></div></section>
    <section className="section wrap"><div className="info-panel cyan-panel"><div><div className="eyebrow"><span className="eyebrow-num">02</span> DOS PRODUCTOS DIFERENTES</div><h2>Live Stage produce sonido.<br/>OSC Live Stage se enfoca en controlarlo.</h2><p>Ambos mantienen su identidad como productos independientes: el instrumento procesa audio; la aplicación OSC envía y recibe órdenes de control.</p></div><ButtonLink to="/live-stage" secondary>Ver instrumento virtual</ButtonLink></div></section>
  </main></>;
}
function Project() {
  return <><PageMeta title="El proyecto"/><main>
    <section className="page-hero about-hero"><div className="wrap"><div className="breadcrumb"><Link to="/">INICIO</Link><span>/</span> PROYECTO</div><div className="project-hero-grid"><div><span className="tag-accent"><span className="tiny-dot"/> DESARROLLO INDEPENDIENTE</span><h1>Software con<br/><span>espíritu de escenario.</span></h1><p>Live Stage nace de una idea sencilla: crear herramientas musicales que se sientan tan directas y expresivas como el hardware dedicado.</p></div><div className="quote-art"><div className="quote-icon"><Icon name="wave" size={54}/></div><span>CREAR<br/>INTERPRETAR<br/>CONECTAR</span></div></div></div></section>
    <section className="section wrap"><SectionIntro index="01" eyebrow="PRINCIPIOS" title="La experiencia importa tanto como la tecnología."/><div className="value-grid"><div><span>01</span><h3>Escenario primero.</h3><p>La accesibilidad de los controles y la rapidez de uso guían las decisiones de interfaz.</p></div><div><span>02</span><h3>Diseño con carácter.</h3><p>Una identidad visual inspirada en equipos físicos: rojo, metal y pantallas de alto contraste.</p></div><div><span>03</span><h3>Arquitecturas modulares.</h3><p>Proyectos separados para procesamiento de instrumentos y control de dispositivos mediante red.</p></div></div></section>
    <section className="section wrap" id="roadmap"><div className="section-intro"><div className="eyebrow"><span className="eyebrow-num">02</span> EN QUÉ TRABAJAMOS</div><h2>Un camino en construcción.</h2><p>Áreas de interés del proyecto, no fechas de lanzamiento ni funcionalidades prometidas.</p></div><div className="roadmap"><div className="roadmap-item"><span>INSTRUMENTO</span><h3>Live Stage</h3><p>Optimización de motores de sonido, edición, efectos y rendimiento en vivo.</p></div><div className="roadmap-item"><span>CONTROL</span><h3>OSC Live Stage</h3><p>Evolución del editor de escenas, los temas de controles y las conexiones OSC/MIDI.</p></div><div className="roadmap-item"><span>ECOSISTEMA</span><h3>Comunidad</h3><p>Documentación, demostraciones y formas de apoyar el desarrollo independiente.</p></div></div></section>
    <section className="section wrap"><div className="end-banner compact"><div><span className="card-kicker">¿QUIERES SER PARTE?</span><h2>Ayuda a construir<br/>lo que sigue.</h2><p>Tu apoyo puede contribuir al desarrollo de nuevas herramientas.</p><ButtonLink to="/apoyar">Formas de apoyar</ButtonLink></div><WaveDecor subtle/></div></section>
  </main></>;
}
function Support() {
  return <><PageMeta title="Apoyar el desarrollo"/><main>
    <section className="page-hero support-hero"><div className="wrap"><div className="breadcrumb"><Link to="/">INICIO</Link><span>/</span> APOYAR</div><div className="support-hero-grid"><div><span className="tag-accent"><Icon name="heart" size={14}/> COMUNIDAD LIVE STAGE</span><h1>El futuro del proyecto<br/><span>también se construye contigo.</span></h1><p>Live Stage es un esfuerzo de desarrollo independiente. El apoyo de la comunidad puede ayudar a mejorar sus instrumentos, su experiencia y su documentación.</p></div><div className="heart-visual"><Icon name="heart" size={82}/><span>MADE FOR MUSICIANS</span></div></div></div></section>
    <section className="section wrap"><SectionIntro index="01" eyebrow="APOYO AL DESARROLLO" title="Cada aporte cuenta." subtitle="Si deseas apoyar voluntariamente el desarrollo de Live Stage y OSC Live Stage, puedes hacerlo mediante nuestro único enlace de PayPal."/><div className="paypal-panel"><div className="paypal-panel__icon"><Icon name="heart" size={32}/></div><div><span className="paypal-panel__eyebrow">APOYO SEGURO / ENLACE EXTERNO</span><h3>Apoya Live Stage por PayPal</h3><p>Las aportaciones se realizan directamente en PayPal. Esta página no solicita ni almacena información de pago.</p><span className="paypal-panel__url">paypal.me/theMusicman2237</span></div><a className="button button-primary paypal-panel__button" href={siteConfig.links.paypal} target="_blank" rel="noopener noreferrer">Donar con PayPal <Icon name="external" size={17}/></a></div><p className="support-disclaimer">El aporte es voluntario. El procesamiento del pago y las opciones disponibles dependen de PayPal.</p></section>
    <section className="section wrap"><div className="info-panel"><div><div className="eyebrow"><span className="eyebrow-num">02</span> MÁS QUE DONACIONES</div><h2>Comparte, prueba, participa.</h2><p>Dar a conocer el proyecto, aportar comentarios sobre la experiencia de uso y reportar errores también son formas importantes de apoyar.</p></div><ButtonLink to="/proyecto" secondary>Conocer el proyecto</ButtonLink></div></section>
  </main></>;
}
function NotFound() {
  return <><PageMeta title="Página no encontrada"/><main className="not-found wrap"><span className="not-found-num">404</span><h1>Esta ruta no está en el escenario.</h1><p>Es posible que la dirección haya cambiado.</p><ButtonLink to="/">Volver al inicio</ButtonLink></main></>;
}
export default function App() {
  return <><a className="skip-link" href="#main-content">Saltar al contenido</a><Header/><ScrollManager/><div id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/live-stage" element={<LiveStage/>}/><Route path="/osc-live-stage" element={<OscStage/>}/><Route path="/proyecto" element={<Project/>}/><Route path="/apoyar" element={<Support/>}/><Route path="*" element={<NotFound/>}/></Routes></div><Footer/></>;
}
