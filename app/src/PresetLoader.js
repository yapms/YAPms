class PresetLoader {
	static loadPreset(value) {
		CandidateManager.initCandidates();

		switch(value) {
			case 'none':
				break;
			case 'classic':
				PresetLoader.loadPresetClassic();
				break;
			case 'republican primary':
				PresetLoader.loadPresetRepublicanPrimary();
				break;
			case 'democratic primary':
				PresetLoader.loadPresetDemocraticPrimary();
				break;
			case 'argentina':
				PresetLoader.loadPresetArgentina();
				break;
			case 'france':
				PresetLoader.loadPresetFrance();
				break;
			case 'germany':
				PresetLoader.loadPresetGermany();
				break;
			case 'southafrica':
				PresetLoader.loadPresetSouthAfrica();
				break;
			case 'india':
				PresetLoader.loadPresetIndia();
				break;
			case 'italy':
				PresetLoader.loadPresetItaly();
				break;
			case 'uk':
				PresetLoader.loadPresetUK();
				break;
			case 'canada':
				PresetLoader.loadPresetCanada();
				break;
			case 'australia':
				PresetLoader.loadPresetAustralia();
				break;
			case 'spain':
				PresetLoader.loadPresetSpain();
				break;
			case 'turkey':
				PresetLoader.loadPresetTurkey();
				break;
			case 'trinidad_tobago':
				PresetLoader.loadPresetTrinidadTobago();
				break;
			case 'netherlands':
				PresetLoader.loadPresetNetherlands();
				break;
			case 'brazil':
				PresetLoader.loadPresetBrazil();
				break;
			case 'ireland':
				PresetLoader.loadPresetIreland();
				break;
			case 'russia':
				PresetLoader.loadPresetRussia();
				break;
			case 'switzerland':
				PresetLoader.loadPresetSwitzerland();
				break;
			case 'sweden':
				PresetLoader.loadPresetSweden();
				break;
			case 'portugal':
				PresetLoader.loadPresetPortugal();
				break;
			case 'pakistan':
				PresetLoader.loadPresetPakistan();
			case 'eu':
				PresetLoader.loadPresetEU();
				break;
		}
	
		ChartManager.updateChart();
		ChartManager.chart.generateLegend();
		LegendManager.updateLegend();
	}

	// republicans vs democrats
	static loadPresetClassic() {
		var republican = new Candidate('Republican', 
			['#bf1d29', '#ff5865', '#ff8b98', '#cf8980']);
		var democrat = new Candidate('Democrat',
			['#1c408c', '#577ccc', '#8aafff', '#949bb3']);

		CandidateManager.candidates['Republican'] = republican;
		CandidateManager.candidates['Democrat'] = democrat;
	}

	static loadPresetRepublicanPrimary() {
		var trump = new Candidate('Trump',
			['#bf1d29','#bf1d29','#bf1d29','#bf1d29']);
		var weld = new Candidate('Weld',
			['#e6b700','#e6b700','#e6b700','#e6b700']);
		var walsh = new Candidate('Walsh',
			['#1c408c','#1c408c','#1c408c','#1c408c']);
		
		CandidateManager.candidates['Trump'] = trump;
		CandidateManager.candidates['Weld'] = weld;
		CandidateManager.candidates['Walsh'] = walsh;
	}

	static loadPresetDemocraticPrimary() {
		var biden = new Candidate('Biden',
			['#009900','#009900','#009900','#009900']);
		var sanders = new Candidate('Sanders',
			['#457FFF','#457FFF','#457FFF','#457FFF']);
		var warren = new Candidate('Warren',
			['#996600','#996600','#996600','#996600']);
		var gabbard = new Candidate('Gabbard',
			['#FF0074','#FF0074','#FF0074','#FF0074']);

		var buttigieg = new Candidate('Buttigieg',
			['#990099','#990099','#990099','#990099']);
		var bloomberg = new Candidate('Bloomberg',
			['#ff9900','#ff9900','#ff9900','#ff9900']);
		var klobuchar = new Candidate('Klobuchar',
			['#000000','#000000','#000000','#000000']);
		
		CandidateManager.candidates['Biden'] = biden;
		CandidateManager.candidates['Sanders'] = sanders;
		CandidateManager.candidates['Warren'] = warren;
		CandidateManager.candidates['Gabbard'] = gabbard;

		CandidateManager.candidates['Buttigieg'] = buttigieg;
		CandidateManager.candidates['Bloomberg'] = bloomberg;
		CandidateManager.candidates['Klobuchar'] = klobuchar;
	}

	// French parties
	static loadPresetFrance() {
		var rn = new Candidate('RN',
			['#004A77', '#004A77', '#004A77', '#004A77']);
		var lrem = new Candidate('LREM', 
			['#FFD600', '#FFD600', '#FFD600', '#FFD600']);
		var eelv = new Candidate('EÉLV',
			['#7AB41D', '#7AB41D', '#7AB41D', '#7AB41D']);
		var lr = new Candidate('LR',
			['#0066CC', '#0066CC', '#0066CC', '#0066CC']);
		var lfi = new Candidate('LFI',
			['#C9462C', '#C9462C', '#C9462C', '#C9462C']);
		var ps = new Candidate('PS',
			['#ED1651', '#ED1651', '#ED1651', '#ED1651']);

		CandidateManager.candidates['RN'] = rn;
		CandidateManager.candidates['LREM'] = lrem;
		CandidateManager.candidates['EÉLV'] = eelv;
		CandidateManager.candidates['LR'] = lr;
		CandidateManager.candidates['LFI'] = lfi;
		CandidateManager.candidates['PS'] = ps;
		LegendManager.toggleLegendLeans()
	}

	// German parties
	static loadPresetGermany() {
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

		CandidateManager.candidates['CDU/CSU'] = union;
		CandidateManager.candidates['SPD'] = spd;
		CandidateManager.candidates['GRÜNE'] = grn;
		CandidateManager.candidates['AfD'] = afd;
		CandidateManager.candidates['FDP'] = fdp;
		CandidateManager.candidates['LINKE'] = dl;
		LegendManager.toggleLegendLeans()
	}

	// Italian parties
	static loadPresetItaly() {
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

		CandidateManager.candidates['Lega'] = lega;
		CandidateManager.candidates['PD'] = pd;
		CandidateManager.candidates['M5S'] = mcs;
		CandidateManager.candidates['FI'] = fi;
		CandidateManager.candidates['FdI'] = fdi;
		CandidateManager.candidates['+EU'] = eu;
		LegendManager.toggleLegendLeans()
	}

	// British parties
	static loadPresetUK() {
		var con = new Candidate('CON', 
			['#0087DC', '#0087DC', '#0087DC', '#0087DC']);
		var lab = new Candidate('LAB',
			['#DC241f', '#DC241f', '#DC241f', '#DC241f']);
		var ldm = new Candidate('LDM',
			['#FDBB30', '#FDBB30', '#FDBB30', '#FDBB30']);
		var snp = new Candidate('SNP',
			['#cccc00', '#cccc00', '#cccc00', '#cccc00']);
		var grn = new Candidate('GRN',
			['#6AB023', '#6AB023', '#6AB023', '#6AB023']);
		var dup = new Candidate('DUP',
			['#D46A4C', '#D46A4C', '#D46A4C', '#D46A4C']);
		var sf = new Candidate('SF',
			['#008800', '#008800', '#008800', '#008800']);
		var pc = new Candidate('PC',
			['#008142', '#008142', '#008142', '#008142']);
		var sdlp = new Candidate('SDLP',
			['#579c85', '#579c85', '#579c85', '#579c85']);
		var all = new Candidate('ALL',
			['#EFCD53', '#EFCD53', '#EFCD53', '#EFCD53']);
		var ind = new Candidate('Ind',
			['#aaaaaa', '#aaaaaa', '#aaaaaa', '#aaaaaa']);

		CandidateManager.candidates['CON'] = con;
		CandidateManager.candidates['LAB'] = lab;
		CandidateManager.candidates['LDM'] = ldm;
		CandidateManager.candidates['SNP'] = snp 
		CandidateManager.candidates['GRN'] = grn;
		CandidateManager.candidates['DUP'] = dup;
		CandidateManager.candidates['SF'] = sf;
		CandidateManager.candidates['PC'] = pc;
		CandidateManager.candidates['SDLP'] = sdlp;
		CandidateManager.candidates['ALL'] = all;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}

	// Canadian parties
	static loadPresetCanada() {
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

		CandidateManager.candidates['CON'] = con;
		CandidateManager.candidates['LIB'] = lib;
		CandidateManager.candidates['NDP'] = ndp;
		CandidateManager.candidates['GRN'] = grn;
		CandidateManager.candidates['BQC'] = bqc;
		CandidateManager.candidates['PPC'] = ppc;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetArgentina() {
		var lc = new Candidate("Let's Change",
			['#ccae0b','#ccae0b','#ccae0b','#ccae0b']);
		var fpv = new Candidate('FPV',
			['#75aadb','#75aadb','#75aadb','#75aadb']);
		var federal = new Candidate('Federal',
			['#19bc9d','#19bc9d','#19bc9d','#19bc9d']);
		var una = new Candidate('UNA',
			['#0a1172','#0a1172','#0a1172','#0a1172']);
		var rxa = new Candidate('RxA',
			['#00677f','#00677f','#00677f','#00677f']);
		var fcps = new Candidate('FCpS',
			['#ff0080','#ff0080','#ff0080','#ff0080']);
		var unity = new Candidate('Unity',
			['#00774f','#00774f','#00774f','#00774f',]);
		var evolution = new Candidate('Evolution',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var fit = new Candidate('FIT',
			['#800000','#800000','#800000','#800000']);
		var catamarca = new Candidate('Catamarca',
			['#ff69b4','#ff69b4','#ff69b4','#ff69b4']);
		var other = new Candidate('Other',
			['#999999','#999999','#999999','#999999']);
		
		CandidateManager.candidates["Let's Change"] = lc;
		CandidateManager.candidates["FPV"] = fpv;
		CandidateManager.candidates["Federal"] = federal;
		CandidateManager.candidates["UNA"] = una;
		CandidateManager.candidates["RxA"] = rxa;
		CandidateManager.candidates["FCpS"] = fcps;
		CandidateManager.candidates["Unity"] = unity;
		CandidateManager.candidates["Evolution"] = evolution;
		CandidateManager.candidates["FIT"] = fit;
		CandidateManager.candidates["Catamarca"] = catamarca;
		CandidateManager.candidates["Other"] = other;
		LegendManager.toggleLegendLeans()
	}

	// Australian parties
	static loadPresetAustralia() {
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

		CandidateManager.candidates['LIB'] = lib;
		CandidateManager.candidates['LNP'] = lnp;
		CandidateManager.candidates['NAT'] = nat;
		CandidateManager.candidates['CLP'] = clp;
		CandidateManager.candidates['IND'] = ind;
		CandidateManager.candidates['CEN'] = cen;
		CandidateManager.candidates['GRN'] = grn;
		CandidateManager.candidates['LAB'] = lab;
		LegendManager.toggleLegendLeans()
	}

	// Spanish Parties
	static loadPresetSpain() {
		var psoe = new Candidate('PSOE',
			['#EF1C27', '#EF1C27', '#EF1C27', '#EF1C27']);
		var pp = new Candidate('PP',
			['#1D84CE', '#1D84CE', '#1D84CE', '#1D84CE']);
		var vox = new Candidate('Vox',
			['#63BE21', '#63BE21', '#63BE21', '#63BE21']);
		var up = new Candidate('Unidas Podemos',
			['#7B4977', '#7B4977', '#7B4977', '#7B4977']);
		var cs = new Candidate('Cs',
			['#EB6109', '#EB6109', '#EB6109', '#EB6109']);
		var erc = new Candidate('ERC-Sobiranistes',
			['#FFB232', '#FFB232', '#FFB232', '#FFB232']);
		var mp = new Candidate('Más País',
			['#0FDEC4', '#0FDEC4', '#0FDEC4', '#0FDEC4']);
		var jxcat = new Candidate('JxCat-Junts',
			['#ED5975', '#ED5975', '#ED5975', '#ED5975']);
		var eajpnv = new Candidate('EAJ/PNV',
			['#4AAE4A', '#4AAE4A', '#4AAE4A', '#4AAE4A']);
		var eh = new Candidate('EH Bildu',
			['#B5CF18', '#B5CF18', '#B5CF18', '#B5CF18']);
		var cup = new Candidate('CUP-PR',
			['#FFED00', '#FFED00', '#FFED00', '#FFED00']);
		var pacma = new Candidate('PACMA',
			['#ADBE18', '#ADBE18', '#ADBE18', '#ADBE18']);
		var cca = new Candidate('CCa-PNC-NC',
			['#FFD700', '#FFD700', '#FFD700', '#FFD700']);
		var bng = new Candidate('BNG',
			['#ADCFEF', '#ADCFEF', '#ADCFEF', '#ADCFEF']);
		var nas = new Candidate('NA+',
			['#999999', '#999999', '#999999', '#999999']);
		var prc = new Candidate('PRC',
			['#C2CE0C', '#C2CE0C', '#C2CE0C', '#C2CE0C']);
		var te = new Candidate('¡Teruel Existe!',
			['#037252', '#037252', '#037252', '#037252']);

		CandidateManager.candidates['PSOE'] = psoe;
		CandidateManager.candidates['PP'] = pp;
		CandidateManager.candidates['Vox'] = vox;
		CandidateManager.candidates['Unidas Podemos'] = up;
		CandidateManager.candidates['Cs'] = cs;
		CandidateManager.candidates['ERC-Sobiranistes'] = erc;
		CandidateManager.candidates['JxCat-Junts'] = jxcat;
		CandidateManager.candidates['Más País'] = mp;
		CandidateManager.candidates['EAJ/PNV'] = eajpnv;
		CandidateManager.candidates['EH Bildu'] = eh;
		CandidateManager.candidates['CCa-PNC-NC'] = cca;
		CandidateManager.candidates['PRC'] = prc;
		CandidateManager.candidates['CUP-PR'] = cup;
		CandidateManager.candidates['PACMA'] = pacma;
		CandidateManager.candidates['BNG'] = bng;
		CandidateManager.candidates['NA+'] = nas;
		CandidateManager.candidates['¡Teruel Existe!'] = te;
		LegendManager.toggleLegendLeans();
	}

	// Turkish Parties
	static loadPresetTurkey() {
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

		CandidateManager.candidates['AKP'] = akp;
		CandidateManager.candidates['MHP'] = mhp;
		CandidateManager.candidates['BBP'] = bbp;
		CandidateManager.candidates['CHP'] = chp;
		CandidateManager.candidates['HDP'] = hdp;
		CandidateManager.candidates['IYI'] = iyi;
		CandidateManager.candidates['SP'] = sp;
		CandidateManager.candidates['TIP'] = tip;
		CandidateManager.candidates['DP'] = dp;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}
	
	// Trinidad and Tobago Parties
	static loadPresetTrinidadTobago() {
		var pnm = new Candidate('PNM',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var unc = new Candidate('UNC',
			['#e8ac41','#e8ac41','#e8ac41','#e8ac41']);
		var cop = new Candidate('COP',
			['#000000','#000000','#000000','#000000']);
		var pdp = new Candidate('PDP',
			['#32cd32','#32cd32','#32cd32','#32cd32']);

		CandidateManager.candidates['PNM'] = pnm;
		CandidateManager.candidates['UNC'] = unc;
		CandidateManager.candidates['COP'] = cop;
		CandidateManager.candidates['PDP'] = pdp;
		LegendManager.toggleLegendLeans()
	}

	// Dutch Parties
	static loadPresetNetherlands() {
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

		CandidateManager.candidates['FvD'] = fvd;
		CandidateManager.candidates['VVD'] = vvd;
		CandidateManager.candidates['CDA'] = cda;
		CandidateManager.candidates['GL'] = gl;
		CandidateManager.candidates['PvdA'] = pvda;
		CandidateManager.candidates['D66'] = d66;
		CandidateManager.candidates['PVV'] = pvv;
		CandidateManager.candidates['SP'] = sp;
		CandidateManager.candidates['CU'] = cu;
		CandidateManager.candidates['PvdD'] = pvdd;
		CandidateManager.candidates['50+'] = a50;
		CandidateManager.candidates['DENK'] = denk;
		LegendManager.toggleLegendLeans();
	}

	// Brazilian Parties
	static loadPresetBrazil() {
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
		
		CandidateManager.candidates['PSL'] = psl;
		CandidateManager.candidates['PP'] = pp;
		CandidateManager.candidates['PL'] = pl;
		CandidateManager.candidates['PSD'] = psd;
		CandidateManager.candidates['MDB'] = mdb;
		CandidateManager.candidates['PRB'] = prb;
		CandidateManager.candidates['PSDB'] = psdb;

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

		CandidateManager.candidates['PT'] = pt;
		CandidateManager.candidates['PSB'] = psb;
		CandidateManager.candidates['PDT'] = pdt;
		CandidateManager.candidates['PSOL'] = psol;

		var pros = new Candidate('PROS',
			['#FF5460','#FF5460','#FF5460','#FF5460']);
		var avante = new Candidate('AVANTE',
			['#ED5F36','#ED5F36','#ED5F36','#ED5F36']);

		CandidateManager.candidates['PROS'] = pros;
		CandidateManager.candidates['AVANTE'] = avante;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetIreland() {
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

		CandidateManager.candidates['FG'] = finegael;
		CandidateManager.candidates['FF'] = fiannafail;
		CandidateManager.candidates['SF'] = sinnfein;
		CandidateManager.candidates['Lab'] = labour;
		CandidateManager.candidates['AAA-PBP'] = aaapbp;
		CandidateManager.candidates['I4C'] = inds4change;
		CandidateManager.candidates['SD'] = socialdemocrats;
		CandidateManager.candidates['GP'] = green;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetRussia() {
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

		CandidateManager.candidates['ER'] = unitedrussia;
		CandidateManager.candidates['LDPR'] = libdem;
		CandidateManager.candidates['CPRF'] = communist;
		CandidateManager.candidates['Patriots'] = patriots;
		CandidateManager.candidates['CP'] = just;
		CandidateManager.candidates['Rodina'] = rodina;
		CandidateManager.candidates['Yabloko'] = yabloko;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetPortugal() {
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

		CandidateManager.candidates['PS'] = ps;
		CandidateManager.candidates['BE'] = be;
		CandidateManager.candidates['PCP'] = pcp;
		CandidateManager.candidates['PEV'] = pev;
		CandidateManager.candidates['PPD/PSD'] = ppdpsd;
		CandidateManager.candidates['CDS-PP'] = cdspp;
		CandidateManager.candidates['PAN'] = pan;
		CandidateManager.candidates['Ind'] = indy;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSouthAfrica() {
		var anc = new Candidate('ANC',
			['#006600','#006600','#006600','#006600']);
		var da = new Candidate('DA',
			['#005ba6','#005ba6','#005ba6','#005ba6']);
		var eff = new Candidate('EFF',
			['#852a2a','#852a2a','#852a2a','#852a2a']);
		var ifp = new Candidate('IFP',
			['#ff0000','#ff0000','#ff0000','#ff0000']);
		var ffp = new Candidate('FF+',
			['#ec8713','#ec8713','#ec8713','#ec8713']);
		var acdp = new Candidate('ACDP',
			['#ba0c2f','#ba0c2f','#ba0c2f','#ba0c2f']);
		var udm = new Candidate('UDM',
			['#ffde01','#ffde01','#ffde01','#ffde01']);
		var atm = new Candidate('ATM',
			['#00adee','#00adee','#00adee','#00adee']);
		var good = new Candidate('Good',
			['#f36900','#f36900','#f36900','#f36900']);
		var nfp = new Candidate('NFP',
			['#ff8040','#ff8040','#ff8040','#ff8040']);
		var aic = new Candidate('AIC',
			['#ffb543','#ffb543','#ffb543','#ffb543']);
		var cope = new Candidate('COPE',
			['#ffca08','#ffca08','#ffca08','#ffca08']);
		var pac = new Candidate('PAC',
			['#008718','#008718','#008718','#008718']);
		var alj = new Candidate('ALJ',
			['#1c9069','#1c9069','#1c9069','#1c9069']);

		CandidateManager.candidates['ANC'] = anc;
		CandidateManager.candidates['DA'] = da;
		CandidateManager.candidates['EFF'] = eff;
		CandidateManager.candidates['IFP'] = ifp;
		CandidateManager.candidates['FF+'] = ffp;
		CandidateManager.candidates['ACDP'] = acdp;
		CandidateManager.candidates['UDM'] = udm;
		CandidateManager.candidates['ATM'] = atm;
		CandidateManager.candidates['Good'] = good;
		CandidateManager.candidates['NFP'] = nfp;
		CandidateManager.candidates['AIC'] = aic;
		CandidateManager.candidates['COPE'] = cope;
		CandidateManager.candidates['PAC'] = pac;
		CandidateManager.candidates['ALJ'] = alj;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetIndia() {
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

		CandidateManager.candidates['BJP'] = bjp;
		CandidateManager.candidates['YSRCP'] = ysrcp;
		CandidateManager.candidates['SS'] = ss;
		CandidateManager.candidates['JD'] = jd;
		CandidateManager.candidates['BJD'] = bjd;
		CandidateManager.candidates['BSP'] = bsp;
		CandidateManager.candidates['TRS'] = trs;
		CandidateManager.candidates['LJP'] = ljp;
		CandidateManager.candidates['INC'] = inc;
		CandidateManager.candidates['DMK'] = dmk;
		CandidateManager.candidates['NCP'] = ncp;
		CandidateManager.candidates['AITC'] = aitc;
		CandidateManager.candidates['SP'] = sp;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSweden() {
		var sap = new Candidate('SAP',
			['#ed1231','#ed1231','#ed1231','#ed1231']);
		var mp = new Candidate('MP',
			['#2b912b','#2b912b','#2b912b','#2b912b']);
		
		var c = new Candidate('C',
			['#216c3e','#216c3e','#216c3e','#216c3e']);
		var l = new Candidate('L',
			['#006ab5','#006ab5','#006ab5','#006ab5']);
		var v = new Candidate('V',
			['#ec121e','#ec121e','#ec121e','#ec121e']);
		
		var m = new Candidate('M',
			['#019cdb','#019cdb','#019cdb','#019cdb']);
		var sd = new Candidate('SD',
			['#fedf09','#fedf09','#fedf09','#fedf09']);
		var kd = new Candidate('KD',
			['#005ea3','#005ea3','#005ea3','#005ea3']);
		var ind = new Candidate('Ind',
			['#999999','#999999','#999999','#999999']);
		
		CandidateManager.candidates['SAP'] = sap;
		CandidateManager.candidates['MP'] = mp;
		CandidateManager.candidates['C'] = c;
		CandidateManager.candidates['L'] = l;
		CandidateManager.candidates['V'] = v;
		CandidateManager.candidates['M'] = m;
		CandidateManager.candidates['SD'] = sd;
		CandidateManager.candidates['KD'] = kd;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans()
	}

	static loadPresetSwitzerland() {
		var svpudc = new Candidate('SVP/UDC', 
			['#088a4b','#088a4b','#088a4b','#088a4b']);
		var fdpplr = new Candidate('FDP/PLR', 
			['#0e52a0','#0e52a0','#0e52a0','#0e52a0']);
		var spps = new Candidate('SDP/PSS', 
			['#FA1360','#FA1360','#FA1360','#FA1360']);
		var gpspes = new Candidate('GPS/PES', 
			['#01df01','#01df01','#01df01','#01df01']);
		var cvppdc = new Candidate('CVP/PDC', 
			['#ef7d00','#ef7d00','#ef7d00','#ef7d00']);
		var glppvl = new Candidate('GLP/PVL',
			['#a6cf42','#a6cf42','#a6cf42','#a6cf42']);
		var bdppdb = new Candidate('BDP/PBD',
			['#000000','#000000','#000000','#000000']);
		var evppev = new Candidate('EVP/PEV',
			['#ffd735','#ffd735','#ffd735','#ffd735']);
		var ldt = new Candidate('LdT',
			['#6495ed','#6495ed','#6495ed','#6495ed']);
		var pdapst = new Candidate('PdA/PST',
			['#FF0000','#FF0000','#FF0000','#FF0000']);
		var sols = new Candidate('SolS',
			['#ababab','#ababab','#ababab','#ababab']);
		var eduudf = new Candidate('EDU/UDF',
			['#9b2a58','#9b2a58','#9b2a58','#9b2a58']);

		CandidateManager.candidates['SVP/UDC'] = svpudc ;
		CandidateManager.candidates['FDP/PLR'] = fdpplr;
		CandidateManager.candidates['SP/PS'] = spps;
		CandidateManager.candidates['GPS/PES'] = gpspes;
		CandidateManager.candidates['CVP/PDC'] = cvppdc;
		CandidateManager.candidates['GLP/PVL'] = glppvl;
		CandidateManager.candidates['BDP/PBD'] = bdppdb;
		CandidateManager.candidates['EVP/PEV'] = evppev;
		CandidateManager.candidates['PdA/PST'] = pdapst;
		CandidateManager.candidates['SolS'] = sols;
		CandidateManager.candidates['EDU/UDF'] = eduudf;
		CandidateManager.candidates['LdT'] = ldt;
		LegendManager.toggleLegendLeans()
	}
	
	static loadPresetPakistan() {
		var pti = new Candidate('PTI', 
			['#ff0f0f','#ff0f0f','#ff0f0f','#ff0f0f']);
		var mqmp = new Candidate('MQM-P', 
			['#8f0303','#8f0303','#8f0303','#8f0303']);
		var pmlq = new Candidate('PML-Q', 
			['#00800d','#00800d','#00800d','#00800d']);
		var bap = new Candidate('BAP', 
			['#9eee58','#9eee58','#9eee58','#9eee58']);
		var gda = new Candidate('GDA', 
			['#769c1e','#769c1e','#769c1e','#769c1e']);
		var aml = new Candidate('AML', 
			['#4aee31','#4aee31','#4aee31','#4aee31']);
		var jwp = new Candidate('JWP', 
			['#d984e3','#d984e3','#d984e3','#d984e3']);
		
		var bnpm = new Candidate('BNP-M', 
			['#eee600','#eee600','#eee600','#eee600']);

		var pmln = new Candidate('PML-N', 
			['#228000','#228000','#228000','#228000']);
		var ppp = new Candidate('PPP', 
			['#000000','#000000','#000000','#000000']);
		var mma = new Candidate('MMA', 
			['#004c00','#004c00','#004c00','#004c00']);
		var anp = new Candidate('ANP', 
			['#ff0800','#ff0800','#ff0800','#ff0800']);

		var ind = new Candidate('Ind', 
			['#afafaf','#afafaf','#afafaf','#afafaf']);

		CandidateManager.candidates['PTI'] = pti;
		CandidateManager.candidates['MQM-P'] = mqmp;
		CandidateManager.candidates['PML-Q'] = pmlq;
		CandidateManager.candidates['BAP'] = bap;
		CandidateManager.candidates['GDA'] = gda;
		CandidateManager.candidates['AML'] = aml;
		CandidateManager.candidates['JWP'] = jwp;
		CandidateManager.candidates['BNP-M'] = bnpm;
		CandidateManager.candidates['PML-N'] = pmln;
		CandidateManager.candidates['PPP'] = ppp;
		CandidateManager.candidates['MMA'] = mma;
		CandidateManager.candidates['ANP'] = anp;
		CandidateManager.candidates['Ind'] = ind;
		LegendManager.toggleLegendLeans();
	}

	static loadPresetEU() {
		var epp = new Candidate('EPP',
			['#3399FF','#3399FF','#3399FF','#3399FF']);
		var pes = new Candidate('PES',
			['#F0001C','#F0001C','#F0001C','#F0001C']);
		var alde = new Candidate('ALDE',
			['#FFD700','#FFD700','#FFD700','#FFD700']);
		var egp = new Candidate('EGP',
			['#99CC33','#99CC33','#99CC33','#99CC33']);
		var ecrp = new Candidate('ECRP',
			['#0054A5','#0054A5','#0054A5','#0054A5']);
		var idp = new Candidate('IDP',
			['#26428B','#26428B','#26428B','#26428B']);
		var pel = new Candidate('PEL',
			['#800000','#800000','#800000','#800000']);
		var efa = new Candidate('EFA',
			['#662287','#662287','#662287','#662287']);
		var edp = new Candidate('EDP',
			['#EE9900','#EE9900','#EE9900','#EE9900']);
		var ecpm = new Candidate('ECPM',
			['#0BAE2C','#0BAE2C','#0BAE2C','#0BAE2C']);
		var ni = new Candidate('NI',
			['#C0C0C0','#C0C0C0','#C0C0C0','#C0C0C0']);

		CandidateManager.candidates['EPP'] = epp;
		CandidateManager.candidates['PES'] = pes;
		CandidateManager.candidates['ALDE'] = alde;
		CandidateManager.candidates['EGP'] = egp;
		CandidateManager.candidates['ECRP'] = ecrp;
		CandidateManager.candidates['IDP'] = idp;
		CandidateManager.candidates['PEL'] = pel;
		CandidateManager.candidates['EFA'] = efa;
		CandidateManager.candidates['EDP'] = edp;
		CandidateManager.candidates['ECPM'] = ecpm;
		CandidateManager.candidates['NI'] = ni;
		LegendManager.toggleLegendLeans();
	}
}
