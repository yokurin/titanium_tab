function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	/*
	var win1 = new Window(L('home')),
		win2 = new Window(L('settings'));

	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title: L('settings'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;

	self.addTab(tab1);
	self.addTab(tab2);
	*/
	
	var TantoAddWindow = require('ui/handheld/tantoAddWindow');
	
	var TantoWin = require('ui/handheld/tantoViewWindow');
	
	
	
	console.log('担当win'+JSON.stringify(TantoWin));
	
	var bumonWin = Ti.UI.createWindow({
		backgroundColor: 'silver',
		title: L('bumon_view')
	});
	
	var syohinWin = Ti.UI.createWindow({
		backgroundColor: 'orange',
		title: L('syohin_view')
	});
	
	var tantoWin = new TantoWin();
	
	
	var tab1 = Ti.UI.createTab({
		icon: 'KS_nav_views.png',
		title: L('bumon'),
		window: bumonWin
	});
	
	var tab2 = Ti.UI.createTab({
		icon: 'KS_nav_views.png',
		title: L('syohin'),
		window: syohinWin
	});
	
	
	var tab3 = Ti.UI.createTab({
		icon: 'KS_nav_views.png',
		title: L('tanto'),
		window: tantoWin
	});
	
	tantoWin.containingTab = tab3;
	
	
	var addBtn = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.ADD
	});
	addBtn.addEventListener('click', function(){
		var tantoAddWin = new TantoAddWindow();
		tab3.open(tantoAddWin,{animated:true});
	});
	tantoWin.rightNavButton = addBtn;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	
	return self;
};

module.exports = ApplicationTabGroup;
