(function(root){
	if(!Array.prototype.indexOf2){
		Array.prototype.indexOf2 = function(fn){
			var num = 0;
			for(var i=0;i<this.length;i++){
				fn(this[i],num);
				num++;
			}
		}
	}
	var yings = ['阿','奕','资','矮','哦','咖','可以','哭','该','抠','仨','西','斯','腮','嗽','搭','期','俗','贷','都','拿','你','努','内','都哦','瓦','黑','福','耶','猴','麻','米','亩','没','谋','牙','与','悠','答','离','如','待','楼','哇','欧','鞥','嘎','机','姑','捏','购','咋','级','租','咧','邹','大','鸡','资','碟','都','吧','比','不','摆','博','啪','批','扑','撇','剖','恩','哈','匣','久','银','臊','辣','红'];
	var fake = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ']; 
	var holiday = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'];
	
	var littleFake = {
		'ぁ' : yings[0],
		'ぃ' : yings[1],
		'ぅ' : yings[2],
		'ぇ' : yings[3],
		'ぉ' : yings[4],
		'ゃ' : yings[5],
		'ゅ' : '呦',
		'ょ' : yings[37],
		'っ' : '',
		'ゎ' : yings[43],
		'ゐ' : yings[1],
		'ゑ' : yings[3]
	};
	var littleHoliday = {
		'ァ' : yings[0],
		'ィ' : yings[1],
		'ゥ' : '污',
		'ェ' : yings[3],
		'ォ' : '',
		'ャ' : yings[35],
		'ュ' : yings[37],
		'ョ' : yings[37],
		'ッ' : '',
		'ヮ' : yings[25],
		'ヰ' : yings[1],
		'ヱ' : '',
		'ヵ' : '',
		'ヶ' : ''
	};
	var chineseText = {
		text : ['私','愛','一','右','雨','円','王','音','下','火','花','貝','学','気','玉','空','月','犬','見','五','口','校','左','山','子','四','糸','字','耳','車','手','十','出','女','上','森','人','水','正','生','青','夕','石','赤','千','川','先','早','草','足','村','大','男','竹','中','虫','町','田','土','二','日','入','白','八','百','文','木','本','名','目','力 ','六'],
		numbering : ['43,15,11','3,1','1,16','31,47','0,33','71','4','4,45','5','5','72,20','5,1','46,48','6','15,30','7','17','1,22','31','50','7,16','50','6,56,39','35,30','50','37','1,19','0,51','31,31','73','18','19,4','59','74','74','34,39','75','31,58','13','13','4','37','13,6','0,5','12,71','5,43','12,71','72,35','76','0,11','32,77','56,1','4,19,9','15,6','74','32,11','74','15','19','1','21','1,39','11,42','72,16','35,7','63,71','34','78','32,3','32,3','39,7','42,7']
	};
	var chineseTest = /^[\u4e00-\u9fa5]+$/;
	
	function Factory(){
		this.dataFactory={};
	}
	Factory.prototype.fake={};
	Factory.prototype.holiday={};
	Factory.prototype.isChinese = function(str){
		return chineseTest.test(str);
	}
	Factory.prototype.init=function(){
		for(var i = 0; i<yings.length;i++){
			this.fake[fake[i]] = yings[i];
			this.holiday[holiday[i]] = yings[i];
		}
		return this;
	}
	Factory.prototype.toTranslate = function(str){
		if(str){
			var lastArr = [];
			this.dataFactory=[];
			var root = this;
			for(var j = 0 ; j<str.length;j++){
				var tStr = str.charAt(j); 
				var try1 = this.fake[tStr];
				var try2 = this.holiday[tStr];
				var try3 = littleFake[tStr];
				var try4 = littleHoliday[tStr];
				if(try1){
					lastArr.push(try1)
				}else if(try2){
					lastArr.push(try2)
				}else if(try3){
					lastArr.push(try3)
				}else if(try4){
					lastArr.push(try4)
				}else if(this.isChinese(tStr)){
					this.dataFactory.push({
						t : tStr,
						rev : '',
						index : j
					})
				}else{
					lastArr.push(tStr)
				}
			};
			chineseText.text.indexOf2(function(a,index){
				for(var i =0 ; i < root.dataFactory.length; i++){
					if(root.dataFactory[i].rev == ''){
						if(root.dataFactory[i].t == a){
							root.dataFactory[i].rev = chineseText.numbering[index]
						}
					}
				}
			})
			for(var i =0 ; i < this.dataFactory.length; i++){
				if(this.dataFactory[i].rev){
					var fox = '(';
					var tg = this.dataFactory[i].rev.split(',');
					for(var j = 0; j<tg.length;j++){
						fox+=yings[tg[j]]
					}
					fox+=')';
					lastArr.splice(this.dataFactory[i].index,0,fox)
				}else{
					lastArr.splice(this.dataFactory[i].index,0,this.dataFactory[i].t)
				}
			}
			return lastArr.join('');	
		}else{
			return '未输入文字';
		}

	}

	root.Readhelp = function(){
		return new Factory().init();
	}

})(window)
