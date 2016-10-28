var lib = {
    urlParams: function(url) {
        var urlParamsList = {};
        var params = url.search.replace(/^\?/, "").split('&'); //�ֿ��ɸ�����ͬ�Ķ���ȥ��'&'
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var temp = param.split("=");
            urlParamsList[temp[0]] = decodeURI(temp[1]);
        }
        return urlParamsList;
    }
};


window.onload = function() {
	
    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);

    var windowLocation = window.location,
        selfUserID = lib.urlParams(windowLocation)['userID'],
        selfSessionID = lib.urlParams(windowLocation)['sessionID'],
        selfSessionToken = lib.urlParams(windowLocation)['sessionToken'],
        selfPeerID = lib.urlParams(windowLocation)['peerID'];

    
}