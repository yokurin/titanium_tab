function tantoEditWindow(e)
{
	var _id = e.rowData.rsId;
	
	//担当者編集
	var tantoEditWin = Ti.UI.createWindow({
		backgroundColor:'#fff',
		title: L('tanto_edit')
	});
	
	//担当者というラベル
	var label1 = Ti.UI.createLabel({
		color: '#999',
		top: 10,
		text: L('tanto_name'),
		textAlign: 'center',
		width: 'auto'
	});
	tantoEditWin.add(label1);
	
	
	//担当者を入力するテキストフィールド
	var textField1 = Ti.UI.createTextField({
		value: e.rowData.title,
		top: 45,
		width: '60%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	tantoEditWin.add(textField1);
	
	var button1 = Ti.UI.createButton({
		title: L('button_update'),
		top: 90,
		width:'80', //大きさを指定するときはstringにすること。
		left: 70	//位置の指定は数値でOK(座標だから)
	});
	button1.addEventListener('click', function(e){
		if(textField1.value.length === 0)
		{
			alert('部門を入力してください');
			textField1.focus();
			return false;
		}
		
		//データベースの更新処理
		var db = Ti.Database.open('sampleDB');
		try{
			//レコード変更
			db.execute('UPDATE tantotb SET name = ? WHERE id = ?', textField1.value, _id);
		}
		catch(e){
			Ti.API.info(e);
		}
		db.close();
		
		//追加したコードをテーブルビューに反映させるために、updateTablesをfireEventで発生させる
		Ti.App.fireEvent('updateTables');
		tantoEditWin.close({animated:true});
	});
	tantoEditWin.add(button1);
	
	var button2 = Ti.UI.createButton({
		title: L('button_delete'),
		//backgroundColor: '#777',
		top: 90,
		width: '80',
		left: 160
	});
	button2.addEventListener('click', function(e){
		var alertDialog = Ti.UI.createAlertDialog({
			title: '削除確認',
			message: '本当に削除しますか?',
			buttonNames: ['OK','キャンセル'],
			//キャンセルボタンがある場合、何番目(0から)のボタンなのかを指定できる
			cancel: 1
		});
		alertDialog.addEventListener('click', function(event){
			//選択されたボタンのindexで判断する
			if(event.index == 0)
			{
				//OK時の処理
				var db = Ti.Database.open('sampleDB');
				try{
					//レコード削除
					db.execute('DELETE FROM tantotb WHERE id = ?',_id);
					
				}
				catch(e){
					Ti.API.info(e);
				}
				db.close();
				Ti.App.fireEvent('updateTables');
				tantoEditWin.close({animated:true});
			}
			
		});
		alertDialog.show();
	});
	tantoEditWin.add(button2);
	
	return tantoEditWin;
	
}

module.exports = tantoEditWindow;