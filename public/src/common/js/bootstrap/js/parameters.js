var panels = ['slideAdDisplayDiv', 'AdAddDiv', 'postAdDisplayDiv', 'clicksStatistics'];

var permissionSuffixes = ['jpg', 'jpeg', 'png', 'gif'];

var tables = ['hotelTable', 'purchaseTable', 'flightsTable'];

var lastPanelId = 'slideAdDisplayDiv';		//上一次访问的panel，后退时用

var lastCategory = '1';			//上一次访问的category，后退时用

var lastPlatform = '1';			//上一次访问的platform，后退时用

var insertFields = ['adNameAdd', 'versionAdd', 'sortAdd', 'phoneTypeAdd', 'channelIdAdd'];	//插入表单各输入框的id

var insertFields2 = ['jumpUrlAdd', 'advTypeTextAdd', 'clientTypeTextAdd'];	//插入表单各下拉选择域的id

var currentTableId = null;		//当前表格id

var currentTableObj = null;		//当前表格内容，json对象，用于修改表格记录

var lastBegin = 0;				//上一次的分页起始值

var isPublishing = false;		//当前操作是否为发布

var pageSize = 10;				//每页记录数

//插入广告参数
var insertArgs = {
	id: null,
	adName: null,
	adType: null,
	phoneType: null,
	version: null,
	jumpType: null,
	jumpLink: null,
	clientType: null,
	sort: null,
	channelId: null,
	picUrl: null,
	dimension: null,
	isDefault: null
};

//点击次数查询参数
var searchArgs = {				
	adType: '',
	phoneType: '',
	version: '',
	jumpType: '',
	clientType: '',
	deviceId: '',
	dimension: '',
	channelId: ''
};

//点击次数统计页面下拉菜单
var dropdowns = ['advType', 'jumpType', 'dimension'];	

var args = {
	action:'upload',	//操作类型
	ids:[],				//选中id
	platform:1,			//1 -- iphone 3 -- android 6 -- wp
	category:1,			//1 -- 幻灯 2 -- 酒店 3 -- 机票 4 -- 团购
	args:null			//参数
};

//上传图片参数
var fileArgs = {
	slideIphone4: null,					//幻灯 iphone 4s
	slideIphone5: null, 				//幻灯 iphone 5s
	slideAndroid: null,					//幻灯 android
	slideAndroidResolution: null,		//幻灯 android 分辨率
	slideWP: null,						//幻灯 WP
	slideWPResolution: null,			//幻灯 WP 分辨率
	postHotelIphone4: null,				//磁贴 iphone 4s 酒店
	postHotelIphone5: null,				//磁贴 iphone 5s 酒店
	postPurchaseIphone4: null,			//磁贴 iphone 4s 团购
	postPurchaseIphone5: null,			//磁贴 iphone 5s 团购
	postFlightsIphone4: null,			//磁贴 iphone 4s 机票
	postFlightsIphone5: null,			//磁贴 iphone 5s 机票
	postHotelAndroid: null,				//磁贴 android 酒店
	postHotelAndroidResolution: null,	//磁贴 android 酒店 分辨率
	postPurchaseAndroid: null,			//磁贴 android 团购
	postPurchaseAndroidResolution: null,//磁贴 android 团购 分辨率
	postFlightsAndroid: null,			//磁贴 android 机票
	postFlightsAndroidResolution: null,	//磁贴 android 机票 分辨率
	postHotelWP: null,					//磁贴 wp 酒店
	postHotelWPResolution: null,		//磁贴 wp 酒店 分辨率
	postPurchaseWP: null,				//磁贴 wp 团购
	postPurchaseWPResolution: null,		//磁贴 wp 团购 分辨率
	postFlightsWP: null,				//磁贴 wp 机票
	postFlightsWPResolution: null		//磁贴 wp 机票 分辨率
};

var jumpTypeMap = {				//跳转方式对照
		'1': 'H5',
		'2': 'APP'
};

var adTypeMap = {				//广告类型对照
		'1': '轮播',
		'2': '酒店磁贴',
		'3': '机票磁贴',
		'4': '团购磁贴'
};

var clientTypeMap = {
		'1':'iphone',
		'3':'android',
		'6':'WindowsPhone'
};

var isDefaultMap = {
		'0': '默认',
		'1': '版本',
		'2': '渠道'
}