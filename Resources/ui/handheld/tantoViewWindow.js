function tantoViewWindow()
{
	//コンストラクタ
	var TantoEditWindow = require('ui/handheld/tantoEditWindow');
	var tantoViewWin = Ti.UI.createWindow({
		title: L('tanto_view')
	});
	var tantoView = Ti.UI.createView();
	
	//グローバルイベントupdateTablesのイベントをここで設定する
	Ti.App.addEventListener('updateTables', function(event){
		tableView.setData(getData());
	});
	
	//テーブュビューの作成
	var tableView = Ti.UI.createTableView();
	
	tableView.setData(getData());
	tantoView.add(tableView);
	
	tableView.addEventListener('click', function(e){
		var tantoEditWin = new TantoEditWindow(e);
		tantoViewWin.containingTab.open(tantoEditWin, {animated:true});
	});
	tantoViewWin.add(tantoView);
	
	return tantoViewWin;
	
}

module.exports = tantoViewWindow;


function getData()
{
	var db = Ti.Database.open('sampleDB');
	try{
		//テーブルが存在しなければつくる
		db.execute('CREATE TABLE IF NOT EXISTS tantotb (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
		
		var rowList = [];
		//レコード取得
		var rs = db.execute('SELECT id, name FROM tantotb');
		while(rs.isValidRow())
		{
			var row = Ti.UI.createTableViewRow({
				title: rs.fieldByName('name'),rsId: rs.fieldByName('id')
			});
			rowList.push(row);
			rs.next();
		}
		rs.close();
	}
	catch(e){
		console.log('select-error');
		Ti.API.info(e);		//コンソールに出力
	}
	db.close();
	
	//console.log("DBの内容"+JSON.stringify(rowList));
	//console.log("DBの内容："+rowList[0].title);
	
	return rowList; 	//DBから取得した配列データを返す
	
}

