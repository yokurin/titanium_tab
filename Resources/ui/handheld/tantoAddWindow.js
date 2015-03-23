function tantoAddWindow()
{
	var tantoAddWin = Ti.UI.createWindow({
		backgroundColor: '#fff',
		title: L('tanto_add')
	});
	
	//担当者というラベル
	var label1 = Ti.UI.createLabel({
		color: '#999',
		top: 0,
		text: L('tanto_name'),
		//font: ...
		textAlign: 'center',
		width: 'auto'
	});
	tantoAddWin.add(label1);
	
	//担当者を入力するテキストフィールド
	var textField1 = Ti.UI.createTextField({
		value: '',
		hintText: L('hint_tanto_name'),
		//color:'#999',
		top:45,
		//left:5,
		width:'60%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	tantoAddWin.add(textField1);
	
	var button1 = Ti.UI.createButton({
		title: L('tanto_add'),
		//backgroundColor: ...,
		top: 90,
		width: '100',
		left: 110
	});
	button1.addEventListener('click', function(e){
		if(textField1.value.length === 0)
		{
			alert('担当者を入力してください');
			textField1.focus();
			return false;
		}
		
		//console.log('入力内容：'+textField1.value);
		
		//データベースの登録処理
		var db = Ti.Database.open('sampleDB');
		try{
			//テーブルが存在しなければつくる
			db.execute('CREATE TABLE IF NOT EXISTS tantotb (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
			
			//レコード追加
			db.execute('INSERT INTO tantotb(name) VALUES (?)', textField1.value);
			
		}
		catch(e){
			console.log('insert-error');
			Ti.API.info(e);
		}
		db.close();
		
		//追加したレコードをテーブルビューに反映させるために、updateTablesをfireEventで発生させる
		Ti.App.fireEvent('updateTables');
		tantoAddWin.close({animated:true});
		
	});
	
	tantoAddWin.add(button1);
	return tantoAddWin;
	
}

module.exports = tantoAddWindow;