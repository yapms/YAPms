
function blockPresetNotify() {
	var notification = document.getElementById('notification');
	notification.style.display = 'inline';
	var message = notification.querySelector('#notification-message');
	var notificationText = 'Presets cannot be changed while editing a historical ' + mapType + ' map';
	message.innerHTML = notificationText;
	var title = notification.querySelector('#notification-title');
	title.innerHTML = 'Sorry';
}

function loadPreset(value) {
	if(blockPresets) {
		blockPresetNotify();
		return;
	}
	
	clearDelegates();
	initCandidates();

	switch(value) {
		case 'tossup':
			break;
		case 'classic':
			loadPresetClassic();
			break;
		case 'republican primary':
			loadPresetRepublicanPrimary();
			break;
		case 'democratic primary':
			loadPresetDemocraticPrimary();
			break;
		case 'libertarian':
			loadPresetLibertarian();
			break;
		case 'green':
			loadPresetGreen();
			break;
		case 'majors':
			loadPresetMajors();
			break;
		case 'france':
			loadPresetFrance();
			break;
		case 'germany':
			loadPresetGermany();
			break;
		case 'india':
			loadPresetIndia();
			break;
		case 'italy':
			loadPresetItaly();
			break;
		case 'uk':
			loadPresetUK();
			break;
		case 'canada':
			loadPresetCanada();
			break;
		case 'australia':
			loadPresetAustralia();
			break;
		case 'spain':
			loadPresetSpain();
			break;
		case 'turkey':
			loadPresetTurkey();
			break;
		case 'netherlands':
			loadPresetNetherlands();
			break;
		case 'brazil':
			loadPresetBrazil();
			break;
		case 'ireland':
			loadPresetIreland();
			break;
		case 'russia':
			loadPresetRussia();
			break;
		case 'portugal':
			loadPresetPortugal();
			break;
	}
	
	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
}

// republicans vs democrats
function loadPresetClassic() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98', '#Cf8980']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF', '#949BB3']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
}

function loadPresetRepublicanPrimary() {
	var trump = new Candidate('Trump',
		['#bf1d29','#bf1d29','#bf1d29','#bf1d29']);
	var weld = new Candidate('Weld',
		['#e6b700','#e6b700','#e6b700','#e6b700']);
	var walsh = new Candidate('Walsh',
		['#1c408c','#1c408c','#1c408c','#1c408c']);
	var sanford = new Candidate('Sanford',
		['#1c8c28','#1c8c28','#1c8c28','#1c8c28']);
	
	candidates['Trump'] = trump;
	candidates['Weld'] = weld;
	candidates['Walsh'] = walsh;
	candidates['Sanford'] = sanford;
}

function loadPresetDemocraticPrimary() {
	var biden = new Candidate('Biden',
		['#009900','#009900','#009900','#009900']);
	var harris = new Candidate('Harris',
		['#ff9900','#ff9900','#ff9900','#ff9900']);
	var sanders = new Candidate('Sanders',
		['#457fff','#457fff','#457fff','#457fff']);
	var warren = new Candidate('Warren',
		['#996600','#996600','#996600','#996600']);
	var buttigieg = new Candidate('Buttigieg',
		['#990099','#990099','#990099','#990099']);
	var orourke = new Candidate('O\'Rourke',
		['#ff66ff','#ff66ff','#ff66ff','#ff66ff']);
	var booker = new Candidate('Booker',
		['#66ccff','#66ccff','#66ccff','#66ccff']);
	var yang = new Candidate('Yang',
		['#3da882','#3da882','#3da882','#3da882']);
	
	candidates['Biden'] = biden;
	candidates['Harris'] = harris;
	candidates['Sanders'] = sanders;
	candidates['Warren'] = warren;
	candidates['Buttigieg'] = buttigieg;
	candidates['O\'Rourke'] = orourke;
	candidates['Booker'] = booker;
	candidates['Yang'] = yang;
}

// republican vs democrat vs libertarian
function loadPresetLibertarian() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98', '#Cf8980']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF', '#949BB3']);
	var libertarian = new Candidate('Libertarian',
		['#e6b700', '#e8c84d', '#ffe78a', '#b8a252']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Libertarian'] = libertarian;
}

// republican vs democrat vs green
function loadPresetGreen() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98', '#Cf8980']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF', '#949BB3']);
	var green = new Candidate('Green',
		['#1c8c28', '#50c85e', '#8aff97', '#7a997e']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;
}

// republican vs democrat vs green vs libertarian
function loadPresetMajors() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98', '#Cf8980']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF', '#949BB3']);
	var green = new Candidate('Green',
		['#1c8c28', '#50c85e', '#8aff97', '#7a997e']);
	var libertarian = new Candidate('Libertarian',
		['#e6b700', '#e8c84d', '#ffe78a', '#b8a252']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;
	candidates['Libertarian'] = libertarian;
}

// French parties
function loadPresetFrance() {
	var lrem = new Candidate('LREM', 
		['#ccb800', '#ccb800', '#ccb800', '#ccb800']);
	var rn = new Candidate('RN',
		['#0D378A', '#0D378A', '#0D378A', '#0D378A']);
	var eelv = new Candidate('EÉLV',
		['#00C000', '#00C000', '#00C000', '#00C000']);
	var lr = new Candidate('LR',
		['#0066CC', '#0066CC', '#0066CC', '#0066CC']);
	var lfi = new Candidate('LFI',
		['#CC2443', '#CC2443', '#CC2443', '#CC2443']);
	var ps = new Candidate('PS',
		['#FF8080', '#FF8080', '#FF8080', '#FF8080']);

	candidates['LREM'] = lrem;
	candidates['RN'] = rn;
	candidates['EÉLV'] = eelv;
	candidates['LR'] = lr;
	candidates['LFI'] = lfi;
	candidates['PS'] = ps;
	toggleLegendLeans()
}

// German parties
function loadPresetGermany() {
	var union = new Candidate('CDU/CSU', 
		['#000000', '#000000', '#000000', '#000000']);
	var spd = new Candidate('SPD',
		['#F0001C', '#F0001C', '#F0001C', '#F0001C']);
	var grn = new Candidate('GRÜNE',
		['#46962B', '#46962B', '#46962B', '#46962B']);
	var afd = new Candidate('AfD',
		['#009EE0', '#009EE0', '#009EE0', '#009EE0']);
	var fdp = new Candidate('FDP',
		['#dec200', '#dec200', '#dec200', '#dec200']);
	var dl = new Candidate('LINKE',
		['#BE3075', '#BE3075', '#BE3075', '#BE3075']);

	candidates['CDU/CSU'] = union;
	candidates['SPD'] = spd;
	candidates['GRÜNE'] = grn;
	candidates['AfD'] = afd;
	candidates['FDP'] = fdp;
	candidates['LINKE'] = dl;
	toggleLegendLeans()
}

// Italian parties
function loadPresetItaly() {
	var lega = new Candidate('Lega', 
		['#008F21', '#008F21', '#008F21', '#008F21']);
	var pd = new Candidate('PD',
		['#FF3643', '#FF3643', '#FF3643', '#FF3643']);
	var mcs = new Candidate('M5S',
		['#FFEB3B', '#FFEB3B', '#FFEB3B', '#FFEB3B']);
	var fi = new Candidate('FI',
		['#318CE7', '#318CE7', '#318CE7', '#318CE7']);
	var fdi = new Candidate('FdI',
		['#003397', '#003397', '#003397', '#003397']);
	var eu = new Candidate('+Eu',
		['#FFD700', '#FFD700', '#FFD700', '#FFD700']);

	candidates['Lega'] = lega;
	candidates['PD'] = pd;
	candidates['M5S'] = mcs;
	candidates['FI'] = fi;
	candidates['FdI'] = fdi;
	candidates['+EU'] = eu;
	toggleLegendLeans()
}

// British parties
function loadPresetUK() {
	var bxp = new Candidate('BXP',
		['#12B6CF', '#12B6CF', '#12B6CF', '#12B6CF']);
	var ldm = new Candidate('LDM',
		['#FDBB30', '#FDBB30', '#FDBB30', '#FDBB30']);
	var lab = new Candidate('LAB',
		['#DC241f', '#DC241f', '#DC241f', '#DC241f']);
	var grn = new Candidate('GRN',
		['#6AB023', '#6AB023', '#6AB023', '#6AB023']);
	var con = new Candidate('CON', 
		['#0087DC', '#0087DC', '#0087DC', '#0087DC']);
	var snp = new Candidate('SNP',
		['#cccc00', '#cccc00', '#cccc00', '#cccc00']);
	var chuk = new Candidate('TIG',
		['#222221', '#222221', '#222221', '#222221']);
	var ukip = new Candidate('UKIP',
		['#70147A', '#70147A', '#70147A', '#70147A']);
	var pc = new Candidate('PC',
		['#008142', '#008142', '#008142', '#008142']);
	var sf = new Candidate('SF',
		['#008800', '#008800', '#008800', '#008800']);
	var dup = new Candidate('DUP',
		['#D46A4C', '#D46A4C', '#D46A4C', '#D46A4C']);
	var uup = new Candidate('UUP',
		['#9999FF', '#9999FF', '#9999FF', '#9999FF']);
	var apni = new Candidate('APNI',
		['#F6CB2F', '#F6CB2F', '#F6CB2F', '#F6CB2F']);

	candidates['BXP'] = bxp;
	candidates['LDM'] = ldm;
	candidates['LAB'] = lab;
	candidates['GRN'] = grn
	candidates['CON'] = con;
	candidates['SNP'] = snp;
	candidates['CHUK'] = chuk;
	candidates['PC'] = pc;
	candidates['SF'] = sf;
	candidates['DUP'] = dup;
	candidates['UUP'] = uup;
	candidates['APNI'] = apni;
	toggleLegendLeans()
}

// Canadian parties
function loadPresetCanada() {
	var con = new Candidate('CON', 
		['#6495ED', '#6495ED', '#6495ED', '#6495ED']);
	var lib = new Candidate('LIB',
		['#F08080', '#F08080', '#F08080', '#F08080']);
	var ndp = new Candidate('NDP',
		['#F4A460', '#F4A460', '#F4A460', '#F4A460']);
	var grn = new Candidate('GRN',
		['#9ACD32', '#9ACD32', '#9ACD32', '#9ACD32']);
	var bqc = new Candidate('BQC',
		['#87CEFA', '#87CEFA', '#87CEFA', '#87CEFA']);
	var ppc = new Candidate('PPC',
		['#83789E', '#83789E', '#83789E', '#83789E']);

	candidates['CON'] = con;
	candidates['LIB'] = lib;
	candidates['NDP'] = ndp;
	candidates['GRN'] = grn;
	candidates['BQC'] = bqc;
	candidates['PPC'] = ppc;
	toggleLegendLeans()
}

// Australian parties
function loadPresetAustralia() {
	var lib = new Candidate('LIB', 
		['#0047AB', '#0047AB', '#0047AB', '#0047AB']);
	var lnp = new Candidate('LNP',
		['#063C7C', '#063C7C', '#063C7C', '#063C7C']);
	var nat = new Candidate('NAT',
		['#006644', '#006644', '#006644', '#006644']);
	var clp = new Candidate('CLP',
		['#F8981D', '#F8981D', '#F8981D', '#F8981D']);
	var ind = new Candidate('IND',
		['#C0C0C0', '#C0C0C0', '#C0C0C0', '#C0C0C0']);
	var cen = new Candidate('CEN',
		['#ff6300', '#ff6300', '#ff6300', '#ff6300']);
	var grn = new Candidate('GRN',
		['#39B54A', '#39B54A', '#39B54A', '#39B54A']);
	var lab = new Candidate('LAB',
		['#DE3533', '#DE3533', '#DE3533', '#DE3533']);

	candidates['LIB'] = lib;
	candidates['LNP'] = lnp;
	candidates['NAT'] = nat;
	candidates['CLP'] = clp;
	candidates['IND'] = ind;
	candidates['CEN'] = cen;
	candidates['GRN'] = grn;
	candidates['LAB'] = lab;
	toggleLegendLeans()
}

// Spanish Parties
function loadPresetSpain() {
	var psoe = new Candidate('PSOE',
		['#EF1C27', '#EF1C27', '#EF1C27', '#EF1C27']);
	var pp = new Candidate('PP',
		['#1D84CE', '#1D84CE', '#1D84CE', '#1D84CE']);
	var cs = new Candidate('CS',
		['#EB6109', '#EB6109', '#EB6109', '#EB6109']);
	var unidas = new Candidate('Unidas Podemos',
		['#7B4977', '#7B4977', '#7B4977', '#7B4977']);
	var vox = new Candidate('Vox',
		['#63BE21', '#63BE21', '#63BE21', '#63BE21']);
	var erc = new Candidate('ERC-Sobiranistes',
		['#FFB232', '#FFB232', '#FFB232', '#FFB232']);
	var jxcat = new Candidate('JxCat-Junts',
		['#ED5975', '#ED5975', '#ED5975', '#ED5975']);
	var eajpnv = new Candidate('EAJ/PNV',
		['#4AAE4A', '#4AAE4A', '#4AAE4A', '#4AAE4A']);
	var eh = new Candidate('EH Bildu',
		['#B5CF18', '#B5CF18', '#B5CF18', '#B5CF18']);
	var compromis = new Candidate('Compromís 2019',
		['#EC8953', '#EC8953', '#EC8953', '#EC8953']);
	var cca = new Candidate('CCa-PNC',
		['#FFD700', '#FFD700', '#FFD700', '#FFD700']);
	var prc = new Candidate('PRC',
		['#C2CE0C', '#C2CE0C', '#C2CE0C', '#C2CE0C']);

	candidates['PSOE'] = psoe;
	candidates['PP'] = pp;
	candidates['CS'] = cs;
	candidates['Unidas Podemos'] = unidas;
	candidates['Vox'] = vox;
	candidates['ERC-Sobiranistes'] = erc;
	candidates['JxCat-Junts'] = jxcat;
	candidates['EAJ/PNV'] = eajpnv;
	candidates['EH Bildu'] = eh;
	candidates['Compromís 2019'] = compromis;
	candidates['CCa-PNC'] = cca;
	candidates['PRC'] = prc;
	toggleLegendLeans();
}

// Turkish Parties
function loadPresetTurkey() {
	var akp = new Candidate('AKP',
		['#ffcc00','#ffcc00','#ffcc00','#ffcc00']);
	var mhp = new Candidate('MHP',
		['#870000','#870000','#870000','#870000']);
	var bbp = new Candidate('BBP',
		['#cc5252','#cc5252','#cc5252','#cc5252']);
	var chp = new Candidate('CHP',
		['#e30000','#e30000','#e30000','#e30000']);
	var hdp = new Candidate('HDP',
		['#951b88','#951b88','#951b88','#951b88']);
	var iyi = new Candidate('IYI',
		['#0099cc','#0099cc','#0099cc','#0099cc']);
	var sp = new Candidate('SP',
		['#ff5f5f','#ff5f5f','#ff5f5f','#ff5f5f']);
	var tip = new Candidate('TIP',
		['#990000','#990000','#990000','#990000']);
	var dp = new Candidate('DP',
		['#ff3333','#ff3333','#ff3333','#ff3333']);
	var ind = new Candidate('Ind',
		['#b0b0b0','#b0b0b0','#b0b0b0','#b0b0b0']);

	candidates['AKP'] = akp;
	candidates['MHP'] = mhp;
	candidates['BBP'] = bbp;
	candidates['CHP'] = chp;
	candidates['HDP'] = hdp;
	candidates['IYI'] = iyi;
	candidates['SP'] = sp;
	candidates['TIP'] = tip;
	candidates['DP'] = dp;
	candidates['Ind'] = ind;
}

// Dutch Parties
function loadPresetNetherlands() {
	var fvd = new Candidate('FvD',
		['#841818','#841818','#841818','#841818']);
	var vvd = new Candidate('VVD',
		['#21276A','#21276A','#21276A','#21276A']);
	var cda = new Candidate('CDA',
		['#007C5E','#007C5E','#007C5E','#007C5E']);
	var gl = new Candidate('GL',
		['#83BD00','#83BD00','#83BD00','#83BD00']);
	var pvda = new Candidate('PvdA',
		['#E12B1A','#E12B1A','#E12B1A','#E12B1A']);
	var d66 = new Candidate('D66',
		['#00B13D','#00B13D','#00B13D','#00B13D']);
	var pvv = new Candidate('PVV',
		['#21468B','#21468B','#21468B','#21468B']);
	var sp = new Candidate('SP',
		['#EE161F','#EE161F','#EE161F','#EE161F']);
	var cu = new Candidate('CU',
		['#00A7EB','#00A7EB','#00A7EB','#00A7EB']);
	var pvdd = new Candidate('PvdD',
		['#006B28','#006B28','#006B28','#006B28']);
	var a50 = new Candidate('50+',
		['#932390','#932390','#932390','#932390']);
	var sgp = new Candidate('SGP',
		['#E95D0F','#E95D0F','#E95D0F','#E95D0F']);
	var denk = new Candidate('DENK',
		['#00A7EB','#00A7EB','#00A7EB','#00A7EB']);

	candidates['FvD'] = fvd;
	candidates['VVD'] = vvd;
	candidates['CDA'] = cda;
	candidates['GL'] = gl;
	candidates['PvdA'] = pvda;
	candidates['D66'] = d66;
	candidates['PVV'] = pvv;
	candidates['SP'] = sp;
	candidates['CU'] = cu;
	candidates['PvdD'] = pvdd;
	candidates['50+'] = a50;
	candidates['DENK'] = denk;
	toggleLegendLeans();
}

// Brazilian Parties
function loadPresetBrazil() {
	var psl = new Candidate('PSL',
		['#203B78','#203B78','#203B78','#203B78']);
	var pp = new Candidate('PP',
		['#7DC9FF','#7DC9FF','#7DC9FF','#7DC9FF']);
	var pl = new Candidate('PL',
		['#0F0073','#0F0073','#0F0073','#0F0073']);
	var psd = new Candidate('PSD',
		['#FFA500','#FFA500','#FFA500','#FFA500']);
	var mdb = new Candidate('MDB',
		['#30914D','#30914D','#30914D','#30914D']);
	var prb = new Candidate('PRB',
		['#00E6A8','#00E6A8','#00E6A8','#00E6A8']);
	var psdb = new Candidate('PSDB',
		['#0080FF','#0080FF','#0080FF','#0080FF']);
	var dem = new Candidate('DEM',
		['#8CC63E','#8CC63E','#8CC63E','#8CC63E']);
	var sd = new Candidate('SD',
		['#FF9C2B','#FF9C2B','#FF9C2B','#FF9C2B']);
	var pode = new Candidate('PODE',
		['#2DA933','#2DA933','#2DA933','#2DA933']);
	var ptb = new Candidate('PTB',
		['#7B7B7B','#7B7B7B','#7B7B7B','#7B7B7B']);
	var psc = new Candidate('PSC',
		['#009118','#009118','#009118','#009118']);
	var novo = new Candidate('NOVO',
		['#FF4D00','#FF4D00','#FF4D00','#FF4D00']);
	var patri = new Candidate('PATRI',
		['#CCAA00','#CCAA00','#CCAA00','#CCAA00']);
	
	candidates['PSL'] = psl;
	candidates['PP'] = pp;
	candidates['PL'] = pl;
	candidates['PSD'] = psd;
	candidates['MDB'] = mdb;
	candidates['PRB'] = prb;
	candidates['PSDB'] = psdb;
	//candidates['DEM'] = dem;
	//candidates['SD'] = sd;
	//candidates['PODE'] = pode;
	//candidates['PTB'] = ptb;
	//candidates['PSC'] = psc;
	//candidates['NOVO'] = novo;
	//candidates['PATRI'] = patri;

	var pt = new Candidate('PT',
		['#CC0000','#CC0000','#CC0000','#CC0000']);
	var psb = new Candidate('PSB',
		['#FFCC00','#FFCC00','#FFCC00','#FFCC00']);
	var pdt = new Candidate('PDT',
		['#FF0000','#FF0000','#FF0000','#FF0000']);
	var psol = new Candidate('PSOL',
		['#700000','#700000','#700000','#700000']);
	var pcdob = new Candidate('PCdoB',
		['#A30000','#A30000','#A30000','#A30000']);
	var cidadania = new Candidate('CIDADANIA',
		['#FF9191','#FF9191','#FF9191','#FF9191']);
	var pmn = new Candidate('PMN',
		['#DD3333','#DD3333','#DD3333','#DD3333']);
	var rede = new Candidate('REDE',
		['#00C2BB','#00C2BB','#00C2BB','#00C2BB']);

	candidates['PT'] = pt;
	candidates['PSB'] = psb;
	candidates['PDT'] = pdt;
	candidates['PSOL'] = psol;
	//candidates['PCdoB'] = pcdob;
	//candidates['CIDADANIA'] = cidadania;
	//candidates['PMN'] = pmn;
	//candidates['REDE'] = rede;

	var pros = new Candidate('PROS',
		['#FF5460','#FF5460','#FF5460','#FF5460']);
	var avante = new Candidate('AVANTE',
		['#ED5F36','#ED5F36','#ED5F36','#ED5F36']);
	var pv = new Candidate('PV',
		['#006600','#006600','#006600','#006600']);

	candidates['PROS'] = pros;
	candidates['AVANTE'] = avante;
	//candidates['PV'] = pv;
}

function loadPresetIreland() {
	var finegael= new Candidate('FG',
		['#6699FF','#6699FF','#6699FF','#6699FF']);
	var fiannafail = new Candidate('FF',
		['#66BB66','#66BB66','#66BB66','#66BB66']);
	var sinnfein = new Candidate('SF',
		['#326760','#326760','#326760','#326760']);
	var labour = new Candidate('Lab',
		['#CC0000','#CC0000','#CC0000','#CC0000']);
	var aaapbp = new Candidate('AAA-PBP',
		['#E5E500','#E5E500','#E5E500','#E5E500']);
	var inds4change = new Candidate('I4C',
		['#FFC0CB','#FFC0CB','#FFC0CB','#FFC0CB']);
	var socialdemocrats = new Candidate('SD',
		['#752F8B','#752F8B','#752F8B','#752F8B']);
	var green = new Candidate('GP',
		['#99CC33','#99CC33','#99CC33','#99CC33']);
	var indy = new Candidate('Ind',
		['#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC']);

	candidates['FG'] = finegael;
	candidates['FF'] = fiannafail;
	candidates['SF'] = sinnfein;
	candidates['Lab'] = labour;
	candidates['AAA-PBP'] = aaapbp;
	candidates['I4C'] = inds4change;
	candidates['SD'] = socialdemocrats;
	candidates['GP'] = green;
	candidates['Ind'] = indy;
}

function loadPresetRussia() {
	var unitedrussia = new Candidate('ER',
		['#0C2C84','#0C2C84','#0C2C84','#0C2C84']);
	var libdem = new Candidate('LDPR',
		['#2862B3','#2862B3','#2862B3','#2862B3']);
	var communist = new Candidate('CPRF',
		['#D70000','#D70000','#D70000','#D70000']);
	var patriots = new Candidate('Patriots',
		['#F6DF3B','#F6DF3B','#F6DF3B','#F6DF3B']);
	var just = new Candidate('CP',
		['#FAB512','#FAB512','#FAB512','#FAB512']);
	var rodina = new Candidate('Rodina',
		['#EA484A','#EA484A','#EA484A','#EA484A']);
	var yabloko = new Candidate('Yabloko',
		['#00A800','#00A800','#00A800','#00A800']);
	var indy = new Candidate('Ind',
		['#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC']);

	candidates['ER'] = unitedrussia;
	candidates['LDPR'] = libdem;
	candidates['CPRF'] = communist;
	candidates['Patriots'] = patriots;
	candidates['CP'] = just;
	candidates['Rodina'] = rodina;
	candidates['Yabloko'] = yabloko;
	candidates['Ind'] = indy;
}

function loadPresetPortugal() {
	var ps = new Candidate('PS', 
		['#ff61ea','#ff61ea','#ff61ea','#ff61ea']);
	var indy = new Candidate('Ind', 
		['#aaaaaa','#aaaaaa','#aaaaaa','#aaaaaa']);
	var be = new Candidate('BE', 
		['#870909','#870909','#870909','#870909']);
	var pcp = new Candidate('PCP', 
		['#ff0000','#ff0000','#ff0000','#ff0000']);
	var pev = new Candidate('PEV', 
		['#008000','#008000','#008000','#008000']);
	var ppdpsd = new Candidate('PPD/PSD',
		['#ff9900','#ff9900','#ff9900','#ff9900']);
	var cdspp = new Candidate('CDS-PP',
		['#00daff','#00daff','#00daff','#00daff']);
	var pan = new Candidate('PAN',
		['#008080','#008080','#008080','#008080']);

	candidates['PS'] = ps;
	candidates['BE'] = be;
	candidates['PCP'] = pcp;
	candidates['PEV'] = pev;
	candidates['PPD/PSD'] = ppdpsd;
	candidates['CDS-PP'] = cdspp;
	candidates['PAN'] = pan;
	candidates['Ind'] = indy;
}

function loadPresetIndia() {
	var bjp = new Candidate('BJP',
		['#ff9933','#ff9933','#ff9933','#ff9933']);
	var ysrcp = new Candidate('YSRCP',
		['#1569c7','#1569c7','#1569c7','#1569c7']);
	var ss = new Candidate('SS',
		['#ff6634','#ff6634','#ff6634','#ff6634']);
	var jd = new Candidate('JD',
		['#004285','#004285','#004285','#004285']);
	var bjd= new Candidate('BJD',
		['#006400','#006400','#006400','#006400']);
	var bsp = new Candidate('BSP',
		['#0000ff','#0000ff','#0000ff','#0000ff']);
	var trs = new Candidate('TRS',
		['#ff89ce','#ff89ce','#ff89ce','#ff89ce']);
	var ljp = new Candidate('LJP',
		['#40ff7e','#40ff7e','#40ff7e','#40ff7e']);

	var inc = new Candidate('INC',
		['#00bfff','#00bfff','#00bfff','#00bfff']);
	var dmk = new Candidate('DMK',
		['#de1100','#de1100','#de1100','#de1100']);
	var ncp = new Candidate('NCP',
		['#008080','#008080','#008080','#008080']);

	var aitc = new Candidate('AITC',
		['#00f200','#00f200','#00f200','#00f200']);
	var sp = new Candidate('SP',
		['#a30000','#a30000','#a30000','#a30000']);

	candidates['BJP'] = bjp;
	candidates['YSRCP'] = ysrcp;
	candidates['SS'] = ss;
	candidates['JD'] = jd;
	candidates['BJD'] = bjd;
	candidates['BSP'] = bsp;
	candidates['TRS'] = trs;
	candidates['LJP'] = ljp;
	candidates['INC'] = inc;
	candidates['DMK'] = dmk;
	candidates['NCP'] = ncp;
	candidates['AITC'] = aitc;
	candidates['SP'] = sp;
}
