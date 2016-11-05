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
	var yings = ['阿','奕','资','矮','噢','咖','可以','哭','该','抠','仨','西','斯','腮','嗽','搭','期','俗','贷','都','拿','你','努','内','都哦','瓦','福','耶','猴','麻','密','亩','没','谋','牙','与','悠','答','离','如','待','楼','哇','欧','鞥','嘎','机','姑','捏','购','咋','级','租','咧','邹','大','鸡','资','碟','都','吧','比','不','摆','博','啪','批','扑','撇','剖','恩','哈','匣','久'];
	var fake = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'];
	var holiday = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ'];
	var chineseText = {
		text : ['私','愛','一','右','雨','円','王','音','下','火','花','貝','学','気','玉','空','月','犬','見','五','口','校','左','山','子','四','糸','字','耳','車','手','十','出','女'],
		numbering : ['42,15,11','3,1','1,16','30,46','0,32','70','4','4,44','5','5','71,20','5,1','45,47','6','15,29','7','17','1,22','30','49','7,16','49','6,55,38','34,29','49','36','1,19','0,50','30,30','72','18','19,4','58','73']
	}
	var chineseTest = /^[\u4e00-\u9fa5]+$/;
	function Factory(){
		this.dataFactory={};
		this.init();
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
				if(try1){
					lastArr.push(try1)
				}else if(try2){
					lastArr.push(try2)
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
					var fox = '';
					var tg = this.dataFactory[i].rev.split(',');
					for(var j = 0; j<tg.length;j++){
						fox+=yings[tg[j]]
					}
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

	window.Readhelp = Factory;

})(window)
