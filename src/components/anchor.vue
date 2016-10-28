<template>
<div class="container" >
    <div class="radio-wrapper">
        <ul class="list clearfix" id="anvfor">
            <li v-for="anchor in anchorInfo">
                <a class="link">
                    <div class="live" v-if="anchor.status">
                        <p>观看直播 ></p>
                    </div>
                     <div v-else class="liveoff">
                        <p>还未开播 ></p>
                    </div>
                    <img src="../img/10.jpg" class="user">
                    <img src="../img/play.png" class="play">
                    <p class="add" v-show="anchor.voted">+1</p>
                </a>
                <div class="user-wrapper">
                    <div class="name">{{anchor.Name}}</div>
                    <div class="num">{{anchor.point}}</div>
                </div>
                <div class="do-btn">
                    <p @click="support(anchor)">支持</p>
                </div>
            </li>
           
        </ul>
    </div>
</div>
</template>

<script>
var anchor=[{"Name":"xiaoA","website":"douyu","content":"SC","point":"1589","status":true,"voted":false},{"Name":"xiaoB","website":"xiongmao","content":"DOTA","point":"612","status":false,"voted":false},{"Name":"xiaoC","website":"quanmin","content":"HS","point":"797","status":true,"voted":false}];
var Live=[{"Name":"xiaoA","status":true},{"Name":"xiaoB","status":false},{"Name":"xiaoC","status":true}];

export default {
  name: 'anchor',
    data() {
            return{ 
               anchorInfo: [],
               livingInfo: [],
               anchorUserID: '',
               voted:false,
               todayHadVote: false,
               intervalDuration: 60 * 1000
               }
          },
    mounted() {
        this.getAnchorInfo();
        this.getLiveStatus();
        this.queryVoteStatus();
        // this.initSetTimeout();
    },
    methods: {
        getAnchorInfo: function() {
          console.log(this.anchorInfo);
          for(var i in anchor){
            this.anchorInfo.push(anchor[i]);
          }
          console.log("anchorInfo is "+this.anchorInfo[0].Name);
        },
        getLiveStatus: function() {
          for(var i in Live){
            this.livingInfo.push(Live[i]);
          console.log("livingInfo is "+this.livingInfo[i].status);
          }
        },
        support:function(anchor){
          anchor.point++;
          anchor.voted=true;
          console.log(anchor.voted)
          var timer=setTimeout(function(){
          anchor.voted=false;
          },250)
        },
        queryVoteStatus: function() {
          console.log("VoteStatus is "+this.todayHadVote);
        },
        initSetTimeout: function() {
            var that = this;
            setIntervalGetAnchorInfo = setInterval(function() {
                that.getAnchorInfo();
            }, that.intervalDuration);
            setIntervalGetLiveStatus = setInterval(function() {
                that.getLiveStatus();
            }, that.intervalDuration);
        },
        singerVote: function(anchor) {
            var getUserID = selfUserID,
                getTargetUserID = anchor.userID;

            if (this.todayHadVote) {
                console.info('每日仅支持一次！');
                return;
            }

            this.$http.jsonp(this.singerVoteUrl, {
                    params: {
                        userID: getUserID,
                        targetUserID: getTargetUserID,
                        sessionID: selfSessionID,
                        sessionToken: selfSessionToken,
                        peerID: selfPeerID
                    }
                })
                .then(function(res) {
                    var rtnData = res.data,
                        that = this;
                    if (rtnData.rtn == 0) {
                        // console.info(rtnData.msg);
                        Vue.set(anchor, 'showAdd', true);
                        anchor.supportCnt++;
                        this.anchorUserID = getTargetUserID;
                        this.todayHadVote = true;

                        clearInterval(setIntervalGetAnchorInfo);

                        // 点击投票，动画（2秒）以后，重新拉取直播状态以及直播信息
                        setTimeout(function() {
                            that.getAnchorInfo();
                            that.getLiveStatus();

                            setIntervalGetAnchorInfo = setInterval(function() {
                                that.getAnchorInfo();
                            }, that.intervalDuration);
                        }, 2000);

                    } else if (rtnData.rtn == 2 || rtnData.rtn == 3 || rtnData.rtn == 1) {
                        console.info(rtnData.msg);
                    }
                })
                .catch(function(res) {
                    console.info('网络失败');
                });
        },
        jumpProfile: function(userID) {
            console.log(userID);
            if (window.pingo_js) {
                window.pingo_js.jumpPage('profile://' + userID);
            }
        },
        jumpVideo: function(anchor) {
            var curUserID = anchor.userID;
            window.location.href = 'http://api.impingo.me/static/singer/preselection-live.html?userID=' + curUserID; // 视频地址
            return;
        },
        jumpLive: function(anchor) {
            var curUserID = anchor.userID,
                curRoomID;
            this.livingInfo.forEach(function(living) {
                if (living.createUserID === curUserID) {
                    if (living.state == "1") {
                        curRoomID = living.roomID;
                    }
                }
            });
            window.location.href = 'http://api.impingo.me/miniSite/livePage?liveID=' + curRoomID;
        }
    },
    filters: {
        getUserImg: function(val) {
            return 'http://a.impingo.me/static/activity/singer/resource/' + val + '.jpg'
        },
        getLiving: function(val, anchor) {
            var curUserID = anchor.userID,
                isLiving = false;
            this.livingInfo.forEach(function(living) {
                if (living.createUserID === curUserID) {
                    if (living.state == "1") {
                        isLiving = true;
                    }
                }
            });
            return isLiving;
        },
        getVoteStatus: function(val, anchor) {
            if (anchor.userID == this.anchorUserID) {
                // 可支持
                return true;
            } else {
                // 不可支持
                return false;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 5px;
}

a {
  color: #42b983;
}
</style>
