/* ============================================================
   GRIMÓRIO DO AVENTUREIRO — D&D 5E | script.js v5.0
   Ficha completa para uso em mesa com dados físicos
   ============================================================ */
'use strict';

/* ─────────────────────────────────────────────
   DADOS SRD — RAÇAS
───────────────────────────────────────────── */
const RACAS_DATA = {
  humano:     { nome:'Humano',     icon:'🧑', descricao:'Versáteis e ambiciosos. +1 em TODOS os atributos.', bonusAtributos:{forca:1,destreza:1,constituicao:1,inteligencia:1,sabedoria:1,carisma:1}, vantagens:['Bônus em todos os atributos','Talento extra (variante)','Proficiência extra em uma habilidade'], subraces:{} },
  elfo:       { nome:'Elfo',       icon:'🧝', descricao:'Graciosos e imortais. +2 Destreza.', bonusAtributos:{destreza:2}, vantagens:['Visão no escuro 60 pés','Imune a sono mágico','Vantagem vs. encantamento','Transe'], subraces:{
    alto_elfo:      {nome:'Alto Elfo',           descricao:'+1 INT. Truque de mago.',                bonusAtributos:{inteligencia:1}, vantagens:['Truque de mago (INT)','Prof. espada longa, arco longo','Idioma extra']},
    elfo_floresta:  {nome:'Elfo da Floresta',    descricao:'+1 SAB. Deslocamento 35 pés.',           bonusAtributos:{sabedoria:1},    vantagens:['Deslocamento 35 pés','Máscara das Terras Selvagens']},
    drow:           {nome:'Elfo Negro (Drow)',   descricao:'+1 CAR. Visão superior e magia.',        bonusAtributos:{carisma:1},      vantagens:['Visão no escuro 120 pés','Magia Drow (Luz das Fadas, Escuridão)','Sensibilidade à Luz Solar']},
  }},
  anao:       { nome:'Anão',       icon:'⛏️', descricao:'Resilientes e determinados. +2 Constituição.', bonusAtributos:{constituicao:2}, vantagens:['Resistência a veneno','Visão no escuro 60 pés','Treinamento com armas Anãs','Conhecimento de Pedra'], subraces:{
    anao_colina:    {nome:'Anão da Colina',      descricao:'+1 SAB. +1 PV por nível.',               bonusAtributos:{sabedoria:1},    vantagens:['+1 PV por nível','Proficiência em Percepção']},
    anao_montanha:  {nome:'Anão da Montanha',    descricao:'+2 FOR. Prof. com armaduras.',            bonusAtributos:{forca:2},        vantagens:['Prof. armaduras leves e médias','Guerreiro nato das profundezas']},
  }},
  halfling:   { nome:'Halfling',   icon:'🏡', descricao:'Pequenos e sortudos. +2 Destreza.', bonusAtributos:{destreza:2}, vantagens:['Sortudo (relança 1s)','Corajoso (vantagem vs. medo)','Agilidade Halfling'], subraces:{
    pes_leves:      {nome:'Pés-Leves',           descricao:'+1 CAR. Furtividade natural.',            bonusAtributos:{carisma:1},      vantagens:['Furtividade Natural','Dom social inato']},
    robusto:        {nome:'Robusto',             descricao:'+1 CON. Resistência a veneno dobrada.',   bonusAtributos:{constituicao:1}, vantagens:['Resistência a veneno','Vantagem em saves vs. veneno']},
  }},
  draconato:  { nome:'Draconato',  icon:'🐉', descricao:'Descendentes de dragões. +2 FOR, +1 CAR.', bonusAtributos:{forca:2,carisma:1}, vantagens:['Sopro de Dragão','Resistência elemental','Aspecto dracônico intimidador'], subraces:{} },
  gnomo:      { nome:'Gnomo',      icon:'🔮', descricao:'Curiosos e inventivos. +2 Inteligência.', bonusAtributos:{inteligencia:2}, vantagens:['Astúcia Gnômica (vantagem vs. magia INT/SAB/CAR)','Visão no escuro 60 pés'], subraces:{
    gnomo_floresta: {nome:'Gnomo da Floresta',   descricao:'+1 DES. Ilusão natural e comunicação.',   bonusAtributos:{destreza:1},     vantagens:['Ilusionista Natural (Ilusão Menor)','Falar com Pequenos Animais']},
    gnomo_rochas:   {nome:'Gnomo das Rochas',    descricao:'+1 CON. Conhecimento de engenhocas.',     bonusAtributos:{constituicao:1}, vantagens:['Ferramenta de tinker','Conhecimento de construtos mágicos']},
  }},
  meio_elfo:  { nome:'Meio-Elfo',  icon:'🌗', descricao:'O melhor das duas heranças. +2 CAR, +1 em dois outros.', bonusAtributos:{carisma:2}, vantagens:['+1 em dois atributos à escolha','Visão no escuro 60 pés','Resistência a encantamentos','Versatilidade: 2 proficiências extras'], subraces:{} },
  meio_orc:   { nome:'Meio-Orc',   icon:'💪', descricao:'Força bruta e determinação. +2 FOR, +1 CON.', bonusAtributos:{forca:2,constituicao:1}, vantagens:['Visão no escuro 60 pés','Ameaçador (prof. Intimidação)','Resistência Implacável (1×/descanso longo)','Ataques Selvagens'], subraces:{} },
  tiefling:   { nome:'Tiefling',   icon:'😈', descricao:'Marca infernal. +1 INT, +2 CAR.', bonusAtributos:{inteligencia:1,carisma:2}, vantagens:['Visão no escuro 60 pés','Resistência a fogo','Herança Infernal (Taumaturgia, Chamas Infernais, Escuridão)'], subraces:{} },
};

/* ─────────────────────────────────────────────
   DADOS SRD — CLASSES
───────────────────────────────────────────── */
const CLASSES_DATA = {
  barbaro:     { nome:'Bárbaro',      dice:'d12', vidaBase:12, descricao:'Guerreiro primitivo impulsionado pela fúria.',              savingThrows:['forca','constituicao'],     periciasBase:['atletismo','intimidacao','percepcao','sobrevivencia','natureza','adestrar_animais'], vantagens:['Fúria (dano extra + resistência a dano físico)','Defesa sem Armadura (10+DES+CON)','Ataque Descuidado','Sentido de Perigo','Movimento Extra'] },
  bardo:       { nome:'Bardo',        dice:'d8',  vidaBase:8,  descricao:'Artista e mago versátil. Inspiração aliados.',             savingThrows:['destreza','carisma'],       periciasBase:['acrobacia','atletismo','enganacao','historia','intuicao','intimidacao','investigacao','medicina','percepcao','persuasao','atuacao','furtividade'], vantagens:['Inspiração Bárdica','Canção de Descanso','Expertise (dobra proficiência)','Segredos Mágicos'] },
  clerigo:     { nome:'Clérigo',      dice:'d8',  vidaBase:8,  descricao:'Campeão divino. Cura, protege e destrói.',                 savingThrows:['sabedoria','carisma'],      periciasBase:['historia','intuicao','medicina','persuasao','religiao'], vantagens:['Canalizar Divindade','Expulsar Mortos-Vivos','Domínio Divino','Intervenção Divina'] },
  druida:      { nome:'Druida',       dice:'d8',  vidaBase:8,  descricao:'Guardião da natureza. Forma Selvagem e magia primordial.',  savingThrows:['inteligencia','sabedoria'], periciasBase:['arcanismo','adestrar_animais','intuicao','medicina','natureza','percepcao','religiao','sobrevivencia'], vantagens:['Forma Selvagem','Ritual Druídico','Passo Florestal','Mente Atemporal'] },
  guerreiro:   { nome:'Guerreiro',    dice:'d10', vidaBase:10, descricao:'Mestre das armas e armaduras.',                             savingThrows:['forca','constituicao'],     periciasBase:['acrobacia','atletismo','historia','intuicao','intimidacao','percepcao','sobrevivencia'], vantagens:['Segundo Fôlego','Surto de Ação','Estilo de Combate','Ataque Extra (nível 5)'] },
  monge:       { nome:'Monge',        dice:'d8',  vidaBase:8,  descricao:'Artista marcial que canaliza ki.',                          savingThrows:['forca','destreza'],        periciasBase:['acrobacia','atletismo','historia','intuicao','religiao','furtividade'], vantagens:['Defesa sem Armadura (10+DES+SAB)','Artes Marciais','Ki','Queda Lenta','Golpe Atordoante'] },
  paladino:    { nome:'Paladino',     dice:'d10', vidaBase:10, descricao:'Guerreiro sagrado. Combate e magia divina.',                savingThrows:['sabedoria','carisma'],      periciasBase:['atletismo','intuicao','intimidacao','medicina','persuasao','religiao'], vantagens:['Sentido Divino','Imposição de Mãos','Smite Divino','Aura de Proteção','Juramento Sagrado'] },
  patrulheiro: { nome:'Patrulheiro',  dice:'d10', vidaBase:10, descricao:'Caçador e rastreador mágico.',                              savingThrows:['forca','destreza'],        periciasBase:['adestrar_animais','atletismo','intuicao','investigacao','natureza','percepcao','furtividade','sobrevivencia'], vantagens:['Inimigo Favorito','Explorador Natural','Companheiro Animal','Ataque Oculto'] },
  ladino:      { nome:'Ladino',       dice:'d8',  vidaBase:8,  descricao:'Mestre das sombras, furtividade e ataques precisos.',       savingThrows:['destreza','inteligencia'], periciasBase:['acrobacia','atletismo','enganacao','intuicao','intimidacao','investigacao','percepcao','atuacao','persuasao','furtividade','prestidigitacao'], vantagens:['Ataque Furtivo','Jargão dos Ladrões','Esquiva Ágil','Expertise','Reflexos Trapaceiros'] },
  feiticeiro:  { nome:'Feiticeiro',   dice:'d6',  vidaBase:6,  descricao:'Magia inata. Poucos feitiços, imenso poder.',               savingThrows:['constituicao','carisma'],  periciasBase:['arcanismo','enganacao','intuicao','intimidacao','persuasao','religiao'], vantagens:['Origem de Feitiçaria','Pontos de Feitiçaria','Metamagia','Restauração de Feitiçaria'] },
  bruxo:       { nome:'Bruxo',        dice:'d8',  vidaBase:8,  descricao:'Magia por pacto. Slots por descanso curto.',                savingThrows:['sabedoria','carisma'],      periciasBase:['arcanismo','enganacao','historia','intimidacao','investigacao','natureza','religiao'], vantagens:['Patrono Transcendental','Pacto Mágico','Invocações Éldricas','Slots recuperados por descanso curto'] },
  mago:        { nome:'Mago',         dice:'d6',  vidaBase:6,  descricao:'Estudioso supremo da magia arcana.',                        savingThrows:['inteligencia','sabedoria'], periciasBase:['arcanismo','historia','intuicao','investigacao','medicina','religiao'], vantagens:['Grimório de magias','Recuperação Arcana','Tradição Arcana','Maestria em Feitiços'] },
};

/* ─────────────────────────────────────────────
   DADOS — BACKGROUNDS
───────────────────────────────────────────── */
const BACKGROUNDS_DATA = {
  acolito:     { nome:'Acólito',              descricao:'Passou a vida a serviço de um templo, aprendendo a canalizar favores divinos.',           pericias:['intuicao','religiao'],         caracteristicas:'Misterioso, devoto e firme em sua fé.' },
  artesao:     { nome:'Artesão da Guilda',    descricao:'Membro respeitado de uma guilda de artesãos com contatos e reputação estabelecida.',     pericias:['historia','persuasao'],        caracteristicas:'Orgulhoso do ofício, pragmático e leal à guilda.' },
  criminoso:   { nome:'Criminoso / Espião',   descricao:'Passou a vida no lado errado da lei, desenvolvendo contatos e habilidades sorrateiras.',   pericias:['enganacao','furtividade'],     caracteristicas:'Esperto, cauteloso e sempre com uma saída planejada.' },
  eremita:     { nome:'Eremita',              descricao:'Viveu isolado em contemplação e reflexão, descobrindo algo de grande importância.',       pericias:['medicina','religiao'],         caracteristicas:'Quieto, reflexivo e com profunda percepção do mundo.' },
  forasteiro:  { nome:'Forasteiro',           descricao:'Cresceu nas terras selvagens, longe da civilização.',                                    pericias:['atletismo','sobrevivencia'],   caracteristicas:'Autoconfiante, direto e em paz com a natureza.' },
  heroi_povo:  { nome:'Herói do Povo',        descricao:'Veio de origem humilde mas o destino o chamou para fazer grandes feitos.',               pericias:['adestrar_animais','sobrevivencia'], caracteristicas:'Compassivo, decidido e protetor dos mais fracos.' },
  marinheiro:  { nome:'Marinheiro',           descricao:'Passou anos nos mares, enfrentando tempestades e criaturas das profundezas.',            pericias:['atletismo','percepcao'],       caracteristicas:'Rude, trabalhador e com histórias de aventuras nos mares.' },
  membro_cla:  { nome:'Membro de Clã',        descricao:'Cresceu nas tradições de um clã de anões, aprendendo os segredos das montanhas.',        pericias:['historia','percepcao'],        caracteristicas:'Tradicional, orgulhoso da herança e fiel ao clã.' },
  nobre:       { nome:'Nobre',                descricao:'Nasceu em berço de ouro com riqueza, privilégios e responsabilidade.',                   pericias:['historia','persuasao'],        caracteristicas:'Sofisticado, confiante e acostumado com o poder.' },
  sabio:       { nome:'Sábio',                descricao:'Passou a vida estudando em bibliotecas e laboratórios, buscando conhecimento.',          pericias:['arcanismo','historia'],        caracteristicas:'Curioso, analítico e sempre em busca de mais saber.' },
  soldado:     { nome:'Soldado',              descricao:'Serviu em um exército ou milícia, sobrevivendo a batalhas e desenvolvendo disciplina.',  pericias:['atletismo','intimidacao'],     caracteristicas:'Disciplinado, direto e leal aos camaradas.' },
  ator:        { nome:'Ator / Artista',       descricao:'Cresceu se apresentando para multidões, aprendendo a encantar e persuadir.',            pericias:['acrobacia','atuacao'],         caracteristicas:'Carismático, expressivo e sempre em busca de audiência.' },
};

/* ─────────────────────────────────────────────
   CONSTANTES & ESTADO
───────────────────────────────────────────── */
const STORAGE_KEY   = 'dnd5e_ficha_v1';
const STANDARD_ARRAY = [15,14,13,12,10,8];
const ATTR_ORDER     = ['forca','destreza','constituicao','inteligencia','sabedoria','carisma'];
const ATTR_META      = {
  forca:        {label:'Força',        rune:'ᚠ', abbr:'FOR'},
  destreza:     {label:'Destreza',     rune:'ᚢ', abbr:'DES'},
  constituicao: {label:'Constituição', rune:'ᚱ', abbr:'CON'},
  inteligencia: {label:'Inteligência', rune:'ᛁ', abbr:'INT'},
  sabedoria:    {label:'Sabedoria',    rune:'ᛊ', abbr:'SAB'},
  carisma:      {label:'Carisma',      rune:'ᛏ', abbr:'CAR'},
};

const defaultData = () => ({
  personagem:    {nome:'', raca:'', classe:'', racaId:'', subracaId:'', classeId:'', backgroundId:''},
  atributos:     {forca:'10',destreza:'10',constituicao:'10',inteligencia:'10',sabedoria:'10',carisma:'10'},
  atributosBase: {forca:'10',destreza:'10',constituicao:'10',inteligencia:'10',sabedoria:'10',carisma:'10'},
  vida:          {atual:0, max:0, temp:0},
  combate:       {ca:10, velocidade:30, nivel:1, xp:0},
  armas:         [],
  inventario:    [],
  moedas:        {pp:0, po:0, pe:0, pc:0},
  pericias:      {},
  proficiencias: {savingThrows:{}},
  background:    {id:''},
  inspiracao:    false,
  observacoes:   '',
});

let appData     = defaultData();
let saveTimeout = null;
const wizState  = { step:1, attrAssign:{forca:'',destreza:'',constituicao:'',inteligencia:'',sabedoria:'',carisma:''} };

/* ─────────────────────────────────────────────
   UTILITÁRIOS
───────────────────────────────────────────── */
const calcMod    = v => { const n=parseInt(v); return isNaN(n)||n<1?null:Math.floor((n-10)/2); };
const formatMod  = m => m===null?'—':m>=0?`+${m}`:`${m}`;
const genId      = () => `i_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
const escHtml    = s => typeof s!=='string'?'':s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const clamp      = (v,mn,mx) => Math.min(mx,Math.max(mn,v));

function getProfBonus(nivel) {
  const n=parseInt(nivel)||1;
  if(n<=4)return 2;if(n<=8)return 3;if(n<=12)return 4;if(n<=16)return 5;return 6;
}
function attrLabel(a){ return ATTR_META[a]?.label||a; }
function skillLabel(id){
  const m={atletismo:'Atletismo',acrobacia:'Acrobacia',furtividade:'Furtividade',prestidigitacao:'Prestidigitação',arcanismo:'Arcanismo',historia:'História',investigacao:'Investigação',natureza:'Natureza',religiao:'Religião',percepcao:'Percepção',intuicao:'Intuição',medicina:'Medicina',sobrevivencia:'Sobrevivência',adestrar_animais:'Adestrar Animais',enganacao:'Enganação',intimidacao:'Intimidação',persuasao:'Persuasão',atuacao:'Atuação'};
  return m[id]||id;
}

/* ─────────────────────────────────────────────
   LOCAL STORAGE — migração de dados antigos
───────────────────────────────────────────── */
function loadFromStorage() {
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const p=JSON.parse(raw);
    const d=defaultData();
    const pers={...d.personagem,...p.personagem};

    // Migrar vida antiga (era string "10" no personagem)
    let vida=d.vida;
    if(p.vida&&typeof p.vida==='object'){vida={...d.vida,...p.vida};}
    else if(p.personagem?.vida){const v=parseInt(p.personagem.vida)||0;vida={atual:v,max:v,temp:0};}

    // Migrar combate
    let combate=d.combate;
    if(p.combate&&typeof p.combate==='object'){combate={...d.combate,...p.combate};}
    else {combate={ca:parseInt(p.personagem?.ca)||10,velocidade:30,nivel:parseInt(p.personagem?.nivel)||1,xp:parseInt(p.personagem?.xp)||0};}

    // Migrar equipamentos → armas
    const armas = Array.isArray(p.armas) ? p.armas :
      (Array.isArray(p.equipamentos) ? p.equipamentos.map(e=>({...e,proficiente:true,bonusExtra:0})) : []);

    return {
      personagem:    pers,
      atributos:     {...d.atributos,...p.atributos},
      atributosBase: {...d.atributosBase,...(p.atributosBase||p.atributos)},
      vida, combate, armas,
      inventario:    Array.isArray(p.inventario)?p.inventario:[],
      moedas:        {...d.moedas,...(p.moedas||{})},
      pericias:      typeof p.pericias==='object'&&p.pericias?p.pericias:{},
      proficiencias: {savingThrows:typeof p.proficiencias?.savingThrows==='object'?p.proficiencias.savingThrows:{}},
      background:    {id:p.background?.id||p.personagem?.backgroundId||''},
      inspiracao:    !!p.inspiracao,
      observacoes:   typeof p.observacoes==='string'?p.observacoes:'',
    };
  } catch(e){ console.warn('Erro ao carregar:',e); return null; }
}

function saveToStorage() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(appData)); showToast(); }
  catch(e){ console.warn('Erro ao salvar:',e); }
}
function debouncedSave(){ clearTimeout(saveTimeout); saveTimeout=setTimeout(saveToStorage,600); }

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
let toastTimer=null;
function showToast(){
  const t=document.getElementById('toast');
  t.classList.add('show'); clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ═══════════════════════════════════════════
   WIZARD DE CRIAÇÃO
═══════════════════════════════════════════ */
function initWizard(){
  buildAttrAssignUI();
  document.getElementById('btn-wiz-next').addEventListener('click',wizardNext);
  document.getElementById('btn-wiz-back').addEventListener('click',wizardBack);
  document.getElementById('btn-criar').addEventListener('click',handleCriar);
  document.getElementById('cr-raca').addEventListener('change',onRacaChange);
  document.getElementById('cr-subraca').addEventListener('change',onSubracaChange);
  document.getElementById('cr-classe').addEventListener('change',onClasseChange);
  document.getElementById('cr-background').addEventListener('change',onBgChangeWizard);
  document.getElementById('cr-nome').addEventListener('input',()=>
    document.getElementById('cr-nome').closest('.creation-field')?.classList.remove('has-error'));
  updateWizardView();
}

function wizardNext(){ if(validateStep(wizState.step)){wizState.step++;updateWizardView();} }
function wizardBack(){ if(wizState.step>1){wizState.step--;updateWizardView();} }

function updateWizardView(){
  document.querySelectorAll('.wizard-step-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(`wstep-${wizState.step}`)?.classList.add('active');
  document.getElementById('btn-wiz-back').style.display = wizState.step>1?'':'none';
  document.getElementById('btn-wiz-next').style.display = wizState.step<4?'':'none';
  document.getElementById('btn-criar').style.display    = wizState.step===4?'':'none';
  document.querySelectorAll('.wp-step').forEach(el=>{
    const s=parseInt(el.dataset.step);
    el.classList.remove('active','done');
    if(s===wizState.step) el.classList.add('active');
    else if(s<wizState.step) el.classList.add('done');
  });
  document.querySelectorAll('.wp-connector').forEach((el,i)=>el.classList.toggle('done',i+1<wizState.step));
  if(wizState.step===4) refreshAttrAssign();
}

function validateStep(s){
  if(s===1){
    const nome=document.getElementById('cr-nome').value.trim();
    if(!nome){document.getElementById('cr-nome').closest('.creation-field').classList.add('has-error');return false;}
    document.getElementById('cr-nome').closest('.creation-field').classList.remove('has-error');return true;
  }
  if(s===2){
    const raca=document.getElementById('cr-raca').value;
    if(!raca){document.getElementById('cr-raca').closest('.creation-field').classList.add('has-error');return false;}
    document.getElementById('cr-raca').closest('.creation-field').classList.remove('has-error');return true;
  }
  if(s===3){
    const c=document.getElementById('cr-classe').value;
    if(!c){document.getElementById('cr-classe').closest('.creation-field').classList.add('has-error');return false;}
    document.getElementById('cr-classe').closest('.creation-field').classList.remove('has-error');return true;
  }
  if(s===4){
    const ok=ATTR_ORDER.every(a=>wizState.attrAssign[a]!=='');
    document.getElementById('attr-assign-warning').style.display=ok?'none':'block';
    return ok;
  }
  return true;
}

// Raça
function onRacaChange(){ updateSubracaOptions(this.value); renderRaceCard(this.value,''); if(wizState.step===4)refreshAttrAssign(); }
function onSubracaChange(){ renderRaceCard(document.getElementById('cr-raca').value,this.value); if(wizState.step===4)refreshAttrAssign(); }

function updateSubracaOptions(racaId){
  const sub=document.getElementById('cr-subraca');
  const sf=document.getElementById('subraca-field');
  const keys=racaId&&RACAS_DATA[racaId]?Object.keys(RACAS_DATA[racaId].subraces):[];
  if(!keys.length){sf.style.display='none';sub.disabled=true;return;}
  sf.style.display='';sub.disabled=false;
  sub.innerHTML='<option value="">— nenhuma —</option>';
  keys.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=RACAS_DATA[racaId].subraces[k].nome;sub.appendChild(o);});
}

function renderRaceCard(racaId,subId){
  const card=document.getElementById('race-info-card');
  if(!racaId||!RACAS_DATA[racaId]){card.style.display='none';return;}
  card.style.display='';
  const raca=RACAS_DATA[racaId],sub=subId?raca.subraces[subId]:null;
  document.getElementById('ric-icon').textContent=raca.icon;
  document.getElementById('ric-name').textContent=sub?`${raca.nome} — ${sub.nome}`:raca.nome;
  document.getElementById('ric-desc').textContent=sub?sub.descricao:raca.descricao;
  const bonuses={...raca.bonusAtributos,...(sub?.bonusAtributos||{})};
  const bEl=document.getElementById('ric-bonuses'); bEl.innerHTML='';
  if(racaId==='humano'){const c=document.createElement('span');c.className='ric-bonus-chip';c.textContent='+1 em todos os atributos';bEl.appendChild(c);}
  else if(racaId==='meio_elfo'){['+ 2 Carisma','+1 em dois atributos à escolha'].forEach(t=>{const c=document.createElement('span');c.className='ric-bonus-chip';c.textContent=t;bEl.appendChild(c);});}
  else{Object.entries(bonuses).forEach(([a,v])=>{const c=document.createElement('span');c.className='ric-bonus-chip';c.textContent=`+${v} ${attrLabel(a)}`;bEl.appendChild(c);});}
  const traits=(sub?sub.vantagens:raca.vantagens);
  const tEl=document.getElementById('ric-traits');tEl.innerHTML='';
  traits.forEach(t=>{const d=document.createElement('div');d.className='ric-trait';d.textContent=t;tEl.appendChild(d);});
}

// Classe
function onClasseChange(){ renderClassCard(this.value); }

function renderClassCard(classeId){
  const card=document.getElementById('class-info-card');
  if(!classeId||!CLASSES_DATA[classeId]){card.style.display='none';return;}
  card.style.display='';
  const cls=CLASSES_DATA[classeId];
  document.getElementById('cic-dice').textContent=cls.dice;
  document.getElementById('cic-name').textContent=cls.nome;
  document.getElementById('cic-desc').textContent=cls.descricao;
  document.getElementById('cic-st').textContent=cls.savingThrows.map(attrLabel).join(' + ');
  document.getElementById('cic-hp').textContent=`${cls.vidaBase} PV (${cls.dice}+CON)`;
  const sk=document.getElementById('cic-skills');sk.innerHTML='';
  cls.periciasBase.forEach(s=>{const t=document.createElement('span');t.className='cic-skill-tag';t.textContent=skillLabel(s);sk.appendChild(t);});
  const ft=document.getElementById('cic-features');ft.innerHTML='';
  cls.vantagens.forEach(v=>{const d=document.createElement('div');d.className='cic-feature';d.textContent=v;ft.appendChild(d);});
}

// Background no wizard
function onBgChangeWizard(){
  const id=this.value,card=document.getElementById('bg-preview');
  if(!id||!BACKGROUNDS_DATA[id]){card.style.display='none';return;}
  card.style.display='';
  const bg=BACKGROUNDS_DATA[id];
  document.getElementById('bg-prev-name').textContent=bg.nome;
  document.getElementById('bg-prev-desc').textContent=bg.descricao;
  const s=document.getElementById('bg-prev-skills');s.innerHTML='';
  bg.pericias.forEach(p=>{const c=document.createElement('span');c.className='bg-skill-chip';c.textContent=skillLabel(p);s.appendChild(c);});
}

// Atributos
function getActiveBonuses(){
  const racaId=document.getElementById('cr-raca')?.value;
  const subId=document.getElementById('cr-subraca')?.value;
  const bonuses={};
  if(!racaId||!RACAS_DATA[racaId]) return bonuses;
  const raca=RACAS_DATA[racaId];
  Object.entries(raca.bonusAtributos).forEach(([k,v])=>{bonuses[k]=(bonuses[k]||0)+v;});
  if(subId&&raca.subraces[subId]) Object.entries(raca.subraces[subId].bonusAtributos).forEach(([k,v])=>{bonuses[k]=(bonuses[k]||0)+v;});
  return bonuses;
}

function buildAttrAssignUI(){
  const chipsEl=document.getElementById('std-array-chips');
  chipsEl.innerHTML=`<div class="std-chips-label">Valores disponíveis:</div>`;
  STANDARD_ARRAY.forEach(v=>{const c=document.createElement('div');c.className='std-chip';c.dataset.val=v;c.textContent=v;chipsEl.appendChild(c);});
  const grid=document.getElementById('attr-assign-grid');grid.innerHTML='';
  ATTR_ORDER.forEach(attr=>{
    const row=document.createElement('div');row.className='attr-assign-row';row.dataset.attr=attr;
    const meta=ATTR_META[attr];
    row.innerHTML=`<div class="aar-name"><span class="aar-rune">${meta.rune}</span>${meta.label}</div>
      <select class="aar-select" id="aar-${attr}" data-attr="${attr}">
        <option value="">—</option>${STANDARD_ARRAY.map(v=>`<option value="${v}">${v}</option>`).join('')}
      </select>
      <div class="aar-bonus" id="aar-bonus-${attr}">—</div>
      <div class="aar-final" id="aar-final-${attr}"><span class="aar-total">—</span><span class="aar-mod"></span></div>`;
    grid.appendChild(row);
  });
  ATTR_ORDER.forEach(attr=>{
    document.getElementById(`aar-${attr}`).addEventListener('change',e=>{
      wizState.attrAssign[attr]=e.target.value;
      // Clear duplicate
      if(e.target.value){ATTR_ORDER.forEach(o=>{if(o!==attr&&wizState.attrAssign[o]===e.target.value){wizState.attrAssign[o]='';const s=document.getElementById(`aar-${o}`);if(s)s.value='';s?.classList.remove('assigned');}});}
      document.getElementById('attr-assign-warning').style.display='none';
      refreshAttrAssign();
    });
  });
}

function refreshAttrAssign(){
  const bonuses=getActiveBonuses();
  const used=Object.values(wizState.attrAssign).filter(v=>v!=='');
  document.querySelectorAll('.std-chip').forEach(c=>c.classList.toggle('used',used.includes(c.dataset.val)));
  ATTR_ORDER.forEach(attr=>{
    const baseStr=wizState.attrAssign[attr],base=baseStr!==''?parseInt(baseStr):null;
    const bonus=bonuses[attr]||0,final=base!==null?base+bonus:null;
    const mod=final!==null?Math.floor((final-10)/2):null;
    const sel=document.getElementById(`aar-${attr}`);
    const bEl=document.getElementById(`aar-bonus-${attr}`);
    const fEl=document.getElementById(`aar-final-${attr}`);
    if(sel) sel.classList.toggle('assigned',baseStr!=='');
    if(bEl){bEl.textContent=bonus>0?`+${bonus}`:bonus<0?`${bonus}`:'—';bEl.classList.toggle('has-bonus',bonus!==0);}
    if(fEl){
      const tEl=fEl.querySelector('.aar-total'),mEl=fEl.querySelector('.aar-mod');
      if(final!==null){tEl.textContent=String(final);mEl.textContent=`(${formatMod(mod)})`;fEl.classList.toggle('boosted',bonus!==0);}
      else{tEl.textContent='—';mEl.textContent='';fEl.classList.remove('boosted');}
    }
  });
}

// Criar personagem
function handleCriar(){
  if(!validateStep(4)) return;
  const nome=document.getElementById('cr-nome').value.trim();
  const racaId=document.getElementById('cr-raca').value;
  const subId=document.getElementById('cr-subraca').value;
  const classeId=document.getElementById('cr-classe').value;
  const bgId=document.getElementById('cr-background').value;
  const raca=RACAS_DATA[racaId],classe=CLASSES_DATA[classeId];
  const bonuses=getActiveBonuses();
  let racaLabel=raca.nome;
  if(subId&&raca.subraces[subId]) racaLabel+=` — ${raca.subraces[subId].nome}`;
  const atributosBase={},atributos={};
  ATTR_ORDER.forEach(a=>{const b=parseInt(wizState.attrAssign[a])||10,bo=bonuses[a]||0;atributosBase[a]=String(b);atributos[a]=String(b+bo);});
  const savingThrows={};classe.savingThrows.forEach(st=>{savingThrows[st]=true;});
  const pericias={};classe.periciasBase.slice(0,2).forEach(p=>{pericias[p]=true;});
  // Auto-add background skill profs
  if(bgId&&BACKGROUNDS_DATA[bgId]) BACKGROUNDS_DATA[bgId].pericias.forEach(p=>{pericias[p]=true;});
  const conMod=Math.floor((parseInt(atributos.constituicao)-10)/2);
  const maxPV=classe.vidaBase+conMod;
  appData={
    personagem:{nome,raca:racaLabel,classe:classe.nome,racaId,subracaId:subId,classeId,backgroundId:bgId},
    atributos,atributosBase,
    vida:{atual:maxPV,max:maxPV,temp:0},
    combate:{ca:10,velocidade:30,nivel:1,xp:0},
    armas:[],inventario:[],moedas:{pp:0,po:0,pe:0,pc:0},
    pericias,proficiencias:{savingThrows},
    background:{id:bgId},
    inspiracao:false,
    observacoes:'',
  };
  saveToStorage(); showApp();
}

/* ─────────────────────────────────────────────
   MOSTRAR / ESCONDER TELAS
───────────────────────────────────────────── */
function showApp(){
  document.getElementById('creation-overlay').classList.add('hidden');
  const app=document.getElementById('app-wrapper');
  app.style.display='flex';
  ['saving-throws-list','prof-pericias-list'].forEach(id=>{const e=document.getElementById(id);if(e){e.innerHTML='';delete e.dataset.built;}});
  renderAll();
}

function showCreation(){
  document.getElementById('creation-overlay').classList.remove('hidden');
  document.getElementById('app-wrapper').style.display='none';
  wizState.step=1; ATTR_ORDER.forEach(a=>wizState.attrAssign[a]='');
  ['cr-nome','cr-raca','cr-classe','cr-background'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  updateSubracaOptions('');
  document.getElementById('race-info-card').style.display='none';
  document.getElementById('class-info-card').style.display='none';
  document.getElementById('subraca-field').style.display='none';
  document.getElementById('bg-preview').style.display='none';
  updateWizardView();
}

/* ─────────────────────────────────────────────
   ABAS
───────────────────────────────────────────── */
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════
   ABA COMBATE
═══════════════════════════════════════════ */
function renderCombate(){
  // Quick stats bar
  setEl('display-ca', appData.combate.ca||10);
  const desMod=calcMod(appData.atributos.destreza)||0;
  setEl('display-init', formatMod(desMod));
  const pp=10+(calcMod(appData.atributos.sabedoria)||0)+(appData.pericias['percepcao']?getProfBonus(appData.combate.nivel):0);
  setEl('display-pp', pp);
  setEl('display-pb', `+${getProfBonus(appData.combate.nivel)}`);
  // Inspiration
  document.getElementById('btn-inspiration').classList.toggle('active',!!appData.inspiracao);
  document.getElementById('btn-inspiration').setAttribute('aria-pressed',String(!!appData.inspiracao));
  // HP
  renderHP();
  // Combat stats fields
  setInputVal('ca-input',   appData.combate.ca||10);
  setInputVal('velocidade', appData.combate.velocidade||30);
  setInputVal('nivel-input',appData.combate.nivel||1);
  setInputVal('xp-input',   appData.combate.xp||0);
  // HP fields
  setInputVal('hp-max',  appData.vida.max||0);
  setInputVal('hp-atual',appData.vida.atual||0);
  setInputVal('hp-temp', appData.vida.temp||0);
  // Weapon summaries
  renderWeaponsSummary();
  // Header name
  if(appData.personagem.nome) setEl('header-char-name',`${escHtml(appData.personagem.nome)} · ${escHtml(appData.personagem.raca||'')} ${escHtml(appData.personagem.classe||'')}`);
}

function renderHP(){
  const atual=appData.vida.atual||0, max=appData.vida.max||1;
  const pct=max>0?clamp(Math.round((atual/max)*100),0,100):0;
  const bar=document.getElementById('hp-bar');
  const barText=document.getElementById('hp-bar-text');
  if(!bar) return;
  bar.style.width=pct+'%';
  bar.classList.remove('mid','low');
  if(pct<=25) bar.classList.add('low');
  else if(pct<=50) bar.classList.add('mid');
  barText.textContent=`${atual} / ${max}`;
  if(appData.vida.temp) barText.textContent+=` (+${appData.vida.temp} tmp)`;
}

function renderWeaponsSummary(){
  const cont=document.getElementById('weapons-summary');
  if(!cont) return;
  if(!appData.armas.length){cont.innerHTML='<div class="no-weapons-hint">Nenhuma arma cadastrada. Adicione na aba 🎒 Arsenal.</div>';return;}
  cont.innerHTML='';
  appData.armas.forEach(w=>{
    const attrMod=calcMod(appData.atributos[w.atributo])||0;
    const profBonus=w.proficiente?getProfBonus(appData.combate.nivel):0;
    const atkBonus=attrMod+profBonus+(parseInt(w.bonusExtra)||0);
    const dmgStr=`${w.dano||'—'}${attrMod>=0?'+'+attrMod:attrMod}`;
    const card=document.createElement('div');card.className='weapon-summary-card';
    card.innerHTML=`
      <div class="wscard-name">${escHtml(w.nome)||'Arma'}</div>
      <div class="wscard-attack"><div class="wscard-attack-label">Ataque</div><div class="wscard-attack-val">${formatMod(atkBonus)}</div></div>
      <div class="wscard-damage"><div class="wscard-dmg-label">Dano</div><div class="wscard-dmg-val">${dmgStr}</div></div>`;
    cont.appendChild(card);
  });
}

function bindCombate(){
  // HP inputs
  document.getElementById('hp-atual').addEventListener('change',e=>{
    appData.vida.atual=clamp(parseInt(e.target.value)||0,0,appData.vida.max||0);
    e.target.value=appData.vida.atual; renderHP(); updateQuickStats(); debouncedSave();
  });
  document.getElementById('hp-max').addEventListener('change',e=>{
    appData.vida.max=Math.max(0,parseInt(e.target.value)||0);
    appData.vida.atual=clamp(appData.vida.atual,0,appData.vida.max);
    document.getElementById('hp-atual').value=appData.vida.atual;
    renderHP(); debouncedSave();
  });
  document.getElementById('hp-temp').addEventListener('change',e=>{
    appData.vida.temp=Math.max(0,parseInt(e.target.value)||0); renderHP(); debouncedSave();
  });
  document.getElementById('btn-hp-dmg').addEventListener('click',()=>{
    const delta=Math.abs(parseInt(document.getElementById('hp-delta').value)||0);
    if(!delta) return;
    appData.vida.atual=clamp(appData.vida.atual-delta,0,appData.vida.max||0);
    document.getElementById('hp-atual').value=appData.vida.atual;
    document.getElementById('hp-bar').classList.add('hp-flash');
    setTimeout(()=>document.getElementById('hp-bar')?.classList.remove('hp-flash'),400);
    document.getElementById('hp-delta').value=''; renderHP(); debouncedSave();
  });
  document.getElementById('btn-hp-heal').addEventListener('click',()=>{
    const delta=Math.abs(parseInt(document.getElementById('hp-delta').value)||0);
    if(!delta) return;
    appData.vida.atual=clamp(appData.vida.atual+delta,0,appData.vida.max||0);
    document.getElementById('hp-atual').value=appData.vida.atual;
    document.getElementById('hp-delta').value=''; renderHP(); debouncedSave();
  });
  // Inspiration toggle
  document.getElementById('btn-inspiration').addEventListener('click',()=>{
    appData.inspiracao=!appData.inspiracao;
    document.getElementById('btn-inspiration').classList.toggle('active',appData.inspiracao);
    document.getElementById('btn-inspiration').setAttribute('aria-pressed',String(appData.inspiracao));
    debouncedSave();
  });
  // Combat fields
  ['ca-input','velocidade','nivel-input','xp-input'].forEach(id=>{
    document.getElementById(id)?.addEventListener('input',e=>{
      const key=id==='ca-input'?'ca':id==='nivel-input'?'nivel':id==='xp-input'?'xp':id;
      const val=parseInt(e.target.value)||0;
      appData.combate[key]=val;
      if(id==='ca-input') setEl('display-ca',val);
      if(id==='nivel-input'){setEl('display-pb',`+${getProfBonus(val)}`);renderSavingThrows();updateAllAtributosST();updateAllSkillMods();renderWeaponsSummary();}
      debouncedSave();
    });
  });
}

function updateQuickStats(){
  const desMod=calcMod(appData.atributos.destreza)||0;
  setEl('display-init',formatMod(desMod));
  const pp=10+(calcMod(appData.atributos.sabedoria)||0)+(appData.pericias['percepcao']?getProfBonus(appData.combate.nivel):0);
  setEl('display-pp',pp);
  setEl('display-ca',appData.combate.ca||10);
  setEl('display-pb',`+${getProfBonus(appData.combate.nivel)}`);
}

/* ═══════════════════════════════════════════
   ABA ATRIBUTOS
═══════════════════════════════════════════ */
function renderAtributos(){
  ATTR_ORDER.forEach(attr=>{
    const input=document.getElementById(attr);
    const modEl=document.getElementById(`mod-${attr}`);
    if(!input) return;
    input.value=appData.atributos[attr]||'';
    updateMod(modEl,input.value);
  });
}
function updateMod(modEl,value){
  if(!modEl) return;
  const mod=calcMod(value);
  modEl.textContent=formatMod(mod);
  modEl.classList.remove('positive','negative');
  if(mod!==null){if(mod>0)modEl.classList.add('positive');else if(mod<0)modEl.classList.add('negative');}
}
function bindAtributos(){
  ATTR_ORDER.forEach(attr=>{
    const input=document.getElementById(attr),modEl=document.getElementById(`mod-${attr}`);
    if(!input) return;
    input.addEventListener('input',()=>{
      input.classList.remove('invalid');
      const v=parseInt(input.value);
      if(input.value!==''&&(isNaN(v)||v<1||v>30)){input.classList.add('invalid');return;}
      appData.atributos[attr]=input.value;
      updateMod(modEl,input.value);
      updateAllAtributosST(); renderSavingThrows(); updateAllSkillMods();
      updateQuickStats(); renderWeaponsSummary();
      debouncedSave();
    });
  });
}

/* ═══════════════════════════════════════════
   ABA PERÍCIAS — SAVING THROWS
═══════════════════════════════════════════ */
const ST_DEF=[{id:'forca',nome:'Força',rune:'ᚠ'},{id:'destreza',nome:'Destreza',rune:'ᚢ'},{id:'constituicao',nome:'Constituição',rune:'ᚱ'},{id:'inteligencia',nome:'Inteligência',rune:'ᛁ'},{id:'sabedoria',nome:'Sabedoria',rune:'ᛊ'},{id:'carisma',nome:'Carisma',rune:'ᛏ'}];

function calcST(attr,prof){
  const attrMod=Math.floor(((parseInt(appData.atributos[attr])||10)-10)/2);
  return attrMod+(prof?getProfBonus(appData.combate.nivel):0);
}
function buildSTTooltip(attr,prof){
  const attrMod=Math.floor(((parseInt(appData.atributos[attr])||10)-10)/2),pb=getProfBonus(appData.combate.nivel);
  return prof?`${formatMod(attrMod)} (mod) + ${pb} (prof) = ${formatMod(attrMod+pb)}`:`${formatMod(attrMod)} (mod) · sem proficiência`;
}
function updateAllAtributosST(){
  ST_DEF.forEach(({id})=>{
    const stEl=document.getElementById(`st-${id}`); if(!stEl) return;
    const prof=!!appData.proficiencias.savingThrows[id],val=calcST(id,prof),str=formatMod(val);
    if(stEl.textContent!==str){stEl.textContent=str;stEl.classList.remove('bump');void stEl.offsetWidth;stEl.classList.add('bump');}
    stEl.className=['attr-st',prof?'st-proficient':'',val>0?'positive':val<0?'negative':''].filter(Boolean).join(' ');
  });
}
function renderSavingThrows(){
  const nivel=appData.combate.nivel||1,bonus=getProfBonus(nivel);
  setEl('st-prof-bonus-display',`+${bonus}`);setEl('st-prof-nivel-display',parseInt(nivel)||1);
  const container=document.getElementById('saving-throws-list'); if(!container) return;
  if(!container.dataset.built){
    container.innerHTML='';
    ST_DEF.forEach(st=>{
      const prof=!!appData.proficiencias.savingThrows[st.id],mod=calcST(st.id,prof);
      const attrMod=Math.floor(((parseInt(appData.atributos[st.id])||10)-10)/2);
      const row=document.createElement('div');row.classList.add('st-row');if(prof)row.classList.add('st-prof-active');row.dataset.stId=st.id;
      row.innerHTML=`<input type="checkbox" class="st-checkbox" id="st-cb-${st.id}" aria-label="Prof. saving throw ${st.nome}" ${prof?'checked':''}/>
        <span class="st-rune">${st.rune}</span><label class="st-name" for="st-cb-${st.id}">${st.nome}</label>
        <span class="st-prof-badge">PROF</span><span class="st-attr-mod" id="statmod-${st.id}">${formatMod(attrMod)}</span>
        <span class="st-mod ${mod>0?'positive':mod<0?'negative':''}" id="stmod-${st.id}">${formatMod(mod)}</span>
        <span class="st-tooltip" id="sttt-${st.id}">${buildSTTooltip(st.id,prof)}</span>`;
      row.querySelector('.st-checkbox').addEventListener('change',e=>{
        appData.proficiencias.savingThrows[st.id]=e.target.checked;
        row.classList.toggle('st-prof-active',e.target.checked);
        updateSingleST(st.id);updateAllAtributosST();debouncedSave();
      });
      container.appendChild(row);
    });
    container.dataset.built='1';
  } else {ST_DEF.forEach(st=>updateSingleST(st.id));}
  renderProfPericiasList();
}
function updateSingleST(id){
  const prof=!!appData.proficiencias.savingThrows[id],val=calcST(id,prof);
  const attrMod=Math.floor(((parseInt(appData.atributos[id])||10)-10)/2);
  const mEl=document.getElementById(`stmod-${id}`),ttEl=document.getElementById(`sttt-${id}`),amEl=document.getElementById(`statmod-${id}`);
  if(amEl)amEl.textContent=formatMod(attrMod);
  if(mEl&&mEl.textContent!==formatMod(val)){mEl.textContent=formatMod(val);mEl.className=`st-mod ${val>0?'positive':val<0?'negative':''}`;mEl.classList.remove('bump');void mEl.offsetWidth;mEl.classList.add('bump');}
  if(ttEl)ttEl.textContent=buildSTTooltip(id,prof);
}

/* ═══════════════════════════════════════════
   ABA PERÍCIAS — SKILLS
═══════════════════════════════════════════ */
const PERICIAS_DEF=[
  {grupo:'Força',atributo:'forca',rune:'ᚠ',pericias:[{id:'atletismo',nome:'Atletismo'}]},
  {grupo:'Destreza',atributo:'destreza',rune:'ᚢ',pericias:[{id:'acrobacia',nome:'Acrobacia'},{id:'furtividade',nome:'Furtividade'},{id:'prestidigitacao',nome:'Prestidigitação'}]},
  {grupo:'Inteligência',atributo:'inteligencia',rune:'ᛁ',pericias:[{id:'arcanismo',nome:'Arcanismo'},{id:'historia',nome:'História'},{id:'investigacao',nome:'Investigação'},{id:'natureza',nome:'Natureza'},{id:'religiao',nome:'Religião'}]},
  {grupo:'Sabedoria',atributo:'sabedoria',rune:'ᛊ',pericias:[{id:'percepcao',nome:'Percepção'},{id:'intuicao',nome:'Intuição'},{id:'medicina',nome:'Medicina'},{id:'sobrevivencia',nome:'Sobrevivência'},{id:'adestrar_animais',nome:'Adestrar Animais'}]},
  {grupo:'Carisma',atributo:'carisma',rune:'ᛏ',pericias:[{id:'enganacao',nome:'Enganação'},{id:'intimidacao',nome:'Intimidação'},{id:'persuasao',nome:'Persuasão'},{id:'atuacao',nome:'Atuação'}]}
];

function calcSkillMod(attr,prof){
  const attrMod=Math.floor(((parseInt(appData.atributos[attr])||10)-10)/2);
  return attrMod+(prof?getProfBonus(appData.combate.nivel):0);
}
function buildSkillTooltip(attr,prof){
  const attrMod=Math.floor(((parseInt(appData.atributos[attr])||10)-10)/2),pb=getProfBonus(appData.combate.nivel);
  return prof?`${formatMod(attrMod)}(${attr})+${pb}(prof)=${formatMod(attrMod+pb)}`:`${formatMod(attrMod)}(${attr}) sem prof.`;
}
function renderProfPericiasList(){
  const container=document.getElementById('prof-pericias-list');if(!container)return;
  if(!container.dataset.built){
    container.innerHTML='';
    PERICIAS_DEF.forEach(group=>{
      const attrMod=Math.floor(((parseInt(appData.atributos[group.atributo])||10)-10)/2);
      const gEl=document.createElement('div');gEl.classList.add('skill-group');
      gEl.innerHTML=`<div class="skill-group-header"><span class="skill-group-rune">${group.rune}</span><span class="skill-group-name">${group.grupo}</span><span class="skill-group-mod" id="sgmod-${group.atributo}">${formatMod(attrMod)}</span></div>`;
      group.pericias.forEach(skill=>{
        const isP=!!appData.pericias[skill.id],mod=calcSkillMod(group.atributo,isP);
        const row=document.createElement('div');row.classList.add('skill-row');row.dataset.skillId=skill.id;row.dataset.atributo=group.atributo;if(isP)row.classList.add('proficient');
        row.innerHTML=`<input type="checkbox" class="skill-checkbox" id="skill-${skill.id}" aria-label="Prof. ${skill.nome}" ${isP?'checked':''}/><label class="skill-name" for="skill-${skill.id}">${skill.nome}</label><span class="skill-prof-tag">PROF</span><span class="skill-mod ${mod>0?'positive':mod<0?'negative':'zero'}" id="skmod-${skill.id}">${formatMod(mod)}</span><span class="skill-tooltip" id="sktt-${skill.id}">${buildSkillTooltip(group.atributo,isP)}</span>`;
        row.querySelector('.skill-checkbox').addEventListener('change',e=>{
          appData.pericias[skill.id]=e.target.checked;row.classList.toggle('proficient',e.target.checked);
          updateSingleSkill(skill.id,group.atributo);updateQuickStats();debouncedSave();
        });
        gEl.appendChild(row);
      });
      container.appendChild(gEl);
    });
    container.dataset.built='1';
  } else {updateAllSkillMods();}
}
function updateSingleSkill(skillId,atributo){
  const prof=!!appData.pericias[skillId],mod=calcSkillMod(atributo,prof),str=formatMod(mod);
  const mEl=document.getElementById(`skmod-${skillId}`),ttEl=document.getElementById(`sktt-${skillId}`);
  const row=document.querySelector(`.skill-row[data-skill-id="${skillId}"]`);
  if(row)row.classList.toggle('proficient',prof);
  if(mEl&&mEl.textContent!==str){mEl.textContent=str;mEl.className=`skill-mod ${mod>0?'positive':mod<0?'negative':'zero'}`;mEl.classList.remove('bump');void mEl.offsetWidth;mEl.classList.add('bump');}
  if(ttEl)ttEl.textContent=buildSkillTooltip(atributo,prof);
}
function updateAllSkillMods(){
  PERICIAS_DEF.forEach(g=>{
    const attrMod=Math.floor(((parseInt(appData.atributos[g.atributo])||10)-10)/2);
    const sg=document.getElementById(`sgmod-${g.atributo}`);if(sg)sg.textContent=formatMod(attrMod);
    g.pericias.forEach(s=>updateSingleSkill(s.id,g.atributo));
  });
}

/* ═══════════════════════════════════════════
   ABA ARSENAL — ARMAS
═══════════════════════════════════════════ */
function renderWeapons(){
  const list=document.getElementById('weapons-list'),empty=document.getElementById('empty-weapons');
  list.innerHTML='';
  if(!appData.armas.length){empty.style.display='flex';}
  else{empty.style.display='none';appData.armas.forEach((w,i)=>list.appendChild(createWeaponCard(w,i)));}
  renderWeaponsSummary();
}

function calcWeaponStats(w){
  const attrMod=calcMod(appData.atributos[w.atributo])||0;
  const profBonus=w.proficiente?getProfBonus(appData.combate.nivel):0;
  const atkBonus=attrMod+profBonus+(parseInt(w.bonusExtra)||0);
  const dmgMod=attrMod+(parseInt(w.bonusExtra)||0);
  const dmgStr=`${w.dano||'—'}${dmgMod>=0?'+'+dmgMod:dmgMod}`;
  return {atkBonus,dmgStr};
}

function createWeaponCard(weapon,index){
  const {atkBonus,dmgStr}=calcWeaponStats(weapon);
  const card=document.createElement('div');card.classList.add('weapon-card');card.dataset.id=weapon.id;
  card.innerHTML=`
    <div class="weapon-card-header">
      <span class="weapon-num">Arma ${index+1}</span>
      <span class="weapon-title">${escHtml(weapon.nome)||'Sem nome'}</span>
      <button class="btn-remove-weapon" type="button" aria-label="Remover arma">✕</button>
    </div>
    <div class="weapon-stats-bar">
      <div class="wstat wstat-atk"><div class="wstat-label">Ataque</div><div class="wstat-val" id="wstat-atk-${weapon.id}">${formatMod(atkBonus)}</div></div>
      <div class="wstat wstat-dmg"><div class="wstat-label">Dano</div><div class="wstat-val" id="wstat-dmg-${weapon.id}">${escHtml(dmgStr)}</div></div>
    </div>
    <div class="weapon-fields">
      <div class="field"><label>Nome</label><input type="text" value="${escHtml(weapon.nome)}" placeholder="Ex: Espada Longa" maxlength="40" data-field="nome" data-id="${weapon.id}" /></div>
      <div class="field"><label>Dano (dado)</label><input type="text" value="${escHtml(weapon.dano)}" placeholder="1d8, 2d6…" maxlength="20" data-field="dano" data-id="${weapon.id}" /></div>
    </div>
    <div class="weapon-fields-row2">
      <div class="field"><label>Atributo</label>
        <select data-field="atributo" data-id="${weapon.id}">
          <option value="forca"    ${weapon.atributo==='forca'?'selected':''}>Força</option>
          <option value="destreza" ${weapon.atributo==='destreza'?'selected':''}>Destreza</option>
        </select>
      </div>
      <div class="field"><label>Bônus extra</label><input type="number" value="${weapon.bonusExtra||0}" placeholder="0" data-field="bonusExtra" data-id="${weapon.id}" /></div>
      <div class="field"><label>Proficiente</label>
        <select data-field="proficiente" data-id="${weapon.id}">
          <option value="true"  ${weapon.proficiente?'selected':''}>Sim</option>
          <option value="false" ${!weapon.proficiente?'selected':''}>Não</option>
        </select>
      </div>
    </div>`;
  card.querySelector('.btn-remove-weapon').addEventListener('click',()=>{appData.armas=appData.armas.filter(w=>w.id!==weapon.id);saveToStorage();renderWeapons();});
  card.querySelectorAll('input,select').forEach(el=>{
    const update=()=>{
      const w=appData.armas.find(x=>x.id===el.dataset.id);if(!w)return;
      const field=el.dataset.field,val=el.value;
      if(field==='proficiente')w[field]=val==='true';
      else if(field==='bonusExtra')w[field]=parseInt(val)||0;
      else w[field]=val;
      if(field==='nome'){const t=card.querySelector('.weapon-title');if(t)t.textContent=val||'Sem nome';}
      // Recalc stats display
      const {atkBonus,dmgStr}=calcWeaponStats(w);
      const aEl=document.getElementById(`wstat-atk-${w.id}`),dEl=document.getElementById(`wstat-dmg-${w.id}`);
      if(aEl)aEl.textContent=formatMod(atkBonus);if(dEl)dEl.textContent=dmgStr;
      renderWeaponsSummary();debouncedSave();
    };
    el.addEventListener('input',update);el.addEventListener('change',update);
  });
  return card;
}

function bindEquipamentos(){
  document.getElementById('btn-add-weapon').addEventListener('click',()=>{
    const nw={id:genId(),nome:'',dano:'',atributo:'forca',proficiente:true,bonusExtra:0};
    appData.armas.push(nw);saveToStorage();renderWeapons();
    requestAnimationFrame(()=>document.querySelector(`[data-id="${nw.id}"][data-field="nome"]`)?.focus());
  });
}

/* ═══════════════════════════════════════════
   ABA ARSENAL — INVENTÁRIO
═══════════════════════════════════════════ */
function renderInventario(){
  const list=document.getElementById('inventory-list'),empty=document.getElementById('empty-inventory');
  list.innerHTML='';
  if(!appData.inventario.length){empty.style.display='flex';}
  else{empty.style.display='none';appData.inventario.forEach((item,i)=>list.appendChild(createInvItemCard(item,i)));}
}

function createInvItemCard(item,index){
  const card=document.createElement('div');card.classList.add('inv-item-card');card.dataset.id=item.id;
  card.innerHTML=`
    <div class="inv-item-header">
      <span class="weapon-num">Item ${index+1}</span>
      <button class="btn-remove-item" type="button" aria-label="Remover item">✕</button>
    </div>
    <div class="inv-item-fields">
      <div class="field"><label>Nome</label><input type="text" value="${escHtml(item.nome)}" placeholder="Ex: Corda (15m)…" maxlength="60" data-field="nome" data-id="${item.id}" /></div>
      <div class="field inv-qty-field"><label>Qtd.</label><input type="number" value="${item.quantidade||1}" min="0" data-field="quantidade" data-id="${item.id}" /></div>
    </div>
    <div class="inv-desc-field"><input type="text" value="${escHtml(item.descricao||'')}" placeholder="Descrição opcional…" maxlength="100" data-field="descricao" data-id="${item.id}" /></div>`;
  card.querySelector('.btn-remove-item').addEventListener('click',()=>{appData.inventario=appData.inventario.filter(x=>x.id!==item.id);saveToStorage();renderInventario();});
  card.querySelectorAll('input').forEach(el=>{
    el.addEventListener('input',()=>{
      const it=appData.inventario.find(x=>x.id===el.dataset.id);if(!it)return;
      it[el.dataset.field]=el.dataset.field==='quantidade'?parseInt(el.value)||0:el.value;
      debouncedSave();
    });
  });
  return card;
}

function bindInventario(){
  document.getElementById('btn-add-item').addEventListener('click',()=>{
    const nw={id:genId(),nome:'',quantidade:1,descricao:''};
    appData.inventario.push(nw);saveToStorage();renderInventario();
    requestAnimationFrame(()=>document.querySelector(`[data-id="${nw.id}"][data-field="nome"]`)?.focus());
  });
}

/* ═══════════════════════════════════════════
   ABA ARSENAL — MOEDAS
═══════════════════════════════════════════ */
function renderMoedas(){
  ['pp','po','pe','pc'].forEach(k=>{setInputVal(`coin-${k}`,appData.moedas[k]||0);});
}
function bindMoedas(){
  ['pp','po','pe','pc'].forEach(k=>{
    document.getElementById(`coin-${k}`)?.addEventListener('input',e=>{appData.moedas[k]=Math.max(0,parseInt(e.target.value)||0);debouncedSave();});
  });
}

/* ═══════════════════════════════════════════
   ABA FICHA — IDENTIDADE & BACKGROUND
═══════════════════════════════════════════ */
function renderFicha(){
  setInputVal('nome',   appData.personagem.nome||'');
  setInputVal('raca',   appData.personagem.raca||'');
  setInputVal('classe', appData.personagem.classe||'');
  // Background
  const bgId=appData.background?.id||'';
  const bgSel=document.getElementById('background-sel');
  if(bgSel) bgSel.value=bgId;
  renderBackgroundCard(bgId);
  // Traits
  renderTraits();
  // Notes
  const ta=document.getElementById('observacoes');
  if(ta){ta.value=appData.observacoes||'';document.getElementById('char-count').textContent=ta.value.length.toLocaleString('pt-BR');}
}

function renderBackgroundCard(bgId){
  const card=document.getElementById('background-card');
  if(!bgId||!BACKGROUNDS_DATA[bgId]){card.style.display='none';return;}
  card.style.display='';
  const bg=BACKGROUNDS_DATA[bgId];
  document.getElementById('bg-card-name').textContent=bg.nome;
  document.getElementById('bg-card-desc').textContent=`${bg.descricao} ${bg.caracteristicas}`;
  const skillsEl=document.getElementById('bg-card-skills');skillsEl.innerHTML='';
  bg.pericias.forEach(p=>{const t=document.createElement('span');t.className='bg-skill-tag';t.textContent=skillLabel(p);skillsEl.appendChild(t);});
}

function renderTraits(){
  const container=document.getElementById('traits-container');if(!container)return;
  const racaId=appData.personagem.racaId||appData.personagem.raca;
  const subId=appData.personagem.subracaId||'';
  const classeId=appData.personagem.classeId||appData.personagem.classe;
  // Try to find by ID first, then by name
  const raca=RACAS_DATA[racaId]||Object.values(RACAS_DATA).find(r=>r.nome===racaId);
  const sub=raca&&subId?raca.subraces[subId]:null;
  const classe=CLASSES_DATA[classeId]||Object.values(CLASSES_DATA).find(c=>c.nome===classeId);

  if(!raca&&!classe){container.innerHTML='<p class="traits-empty">Crie um personagem para ver as habilidades automaticamente.</p>';return;}
  container.innerHTML='';

  if(raca){
    addTraitSection(container,'🌍',sub?`${raca.nome} — ${sub.nome}`:raca.nome, sub?sub.vantagens:raca.vantagens);
    if(sub&&raca.vantagens.length) addTraitSection(container,'⚡',`Traços de ${raca.nome}`,raca.vantagens);
  }
  if(classe) addTraitSection(container,'⚔️',classe.nome,classe.vantagens);
}

function addTraitSection(container,icon,name,traits){
  const sec=document.createElement('div');sec.className='trait-section';
  const header=document.createElement('div');header.className='trait-section-header';
  header.innerHTML=`<span class="trait-section-icon">${icon}</span><span class="trait-section-name">${escHtml(name)}</span>`;
  const items=document.createElement('div');items.className='trait-items';
  traits.forEach(t=>{const d=document.createElement('div');d.className='trait-item';d.innerHTML=`<span class="trait-text">${escHtml(t)}</span>`;items.appendChild(d);});
  sec.appendChild(header);sec.appendChild(items);container.appendChild(sec);
}

function bindFicha(){
  ['nome','raca','classe'].forEach(f=>{
    document.getElementById(f)?.addEventListener('input',e=>{appData.personagem[f]=e.target.value;if(f==='nome')setEl('header-char-name',e.target.value);debouncedSave();});
  });
  document.getElementById('background-sel')?.addEventListener('change',e=>{
    appData.background.id=e.target.value;renderBackgroundCard(e.target.value);debouncedSave();
  });
  const ta=document.getElementById('observacoes');
  ta?.addEventListener('input',()=>{
    appData.observacoes=ta.value;
    document.getElementById('char-count').textContent=ta.value.length.toLocaleString('pt-BR');
    debouncedSave();
  });
}

/* ─────────────────────────────────────────────
   RESET / NOVO PERSONAGEM
───────────────────────────────────────────── */
let modalMode='reset';
function bindReset(){
  const modal=document.getElementById('modal-reset');
  document.getElementById('btn-reset').addEventListener('click',()=>{
    modalMode='reset';
    document.getElementById('modal-icon').textContent='⚠️';
    document.getElementById('modal-title').textContent='Limpar Ficha?';
    document.getElementById('modal-text').textContent='Todos os dados serão apagados permanentemente.';
    modal.classList.add('show');
  });
  document.getElementById('btn-new-char').addEventListener('click',()=>{
    modalMode='new';
    document.getElementById('modal-icon').textContent='✨';
    document.getElementById('modal-title').textContent='Novo Personagem?';
    document.getElementById('modal-text').textContent='Os dados atuais serão perdidos. Criar novo personagem?';
    modal.classList.add('show');
  });
  document.getElementById('btn-cancel-reset').addEventListener('click',()=>modal.classList.remove('show'));
  modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show');});
  document.getElementById('btn-confirm-reset').addEventListener('click',()=>{
    localStorage.removeItem(STORAGE_KEY);appData=defaultData();modal.classList.remove('show');
    if(modalMode==='new'){showCreation();}
    else{
      ['saving-throws-list','prof-pericias-list'].forEach(id=>{const e=document.getElementById(id);if(e){e.innerHTML='';delete e.dataset.built;}});
      renderAll();showToast();
    }
  });
}

/* ─────────────────────────────────────────────
   RENDER ALL
───────────────────────────────────────────── */
function renderAll(){
  renderCombate();
  renderAtributos();
  renderSavingThrows();
  updateAllAtributosST();
  renderWeapons();
  renderInventario();
  renderMoedas();
  renderFicha();
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function setEl(id,val){ const e=document.getElementById(id); if(e) e.textContent=val; }
function setInputVal(id,val){ const e=document.getElementById(id); if(e) e.value=val; }

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO
───────────────────────────────────────────── */
function init(){
  initWizard();
  initTabs();
  bindCombate();
  bindAtributos();
  bindEquipamentos();
  bindInventario();
  bindMoedas();
  bindFicha();
  bindReset();

  const saved=loadFromStorage();
  if(saved){appData=saved;showApp();}
  else{showCreation();}

  console.log('%cGrimório do Aventureiro 🐉 v5.0','color:#c9a84c;font-size:1.1rem;font-weight:bold;');
  console.log('%cFicha completa para uso em mesa','color:#7c5cbf;');
}

document.addEventListener('DOMContentLoaded',init);
