<template>
  <section class="container">
    <!-- 服务器信息 -->
    <section class="box server-info">
      <h2>服务器信息</h2>
      <div class="server-main">
        <ol>
          <li><span>Node版本:</span>{{info.release}}</li>
          <li><span>CPU信息:</span>{{info.cpus.length}}核 {{info.cpus[0].model}}</li>
          <li><span>系统类型:</span>{{info.platform}}</li>
        </ol>
        <ol>
          <li><span>运行时间:</span>{{info.uptime}}</li>
          <li><span>处理器架构:</span>{{info.arch}}</li>
          <li><span>主机名:</span>{{info.hostname}}</li>
        </ol>
      </div>
    </section>

    <!-- 开发团队信息 -->
    <section class="box">
      <h2>开发团队信息</h2>
      <div class="server-main">
        <ol>
          <!--<li><span>NanAdmin官网:</span><a href="https://hcode.xyz/forum-6.htm" target="_blank">https://hcode.xyz</a></li>-->
          <li><span>github:</span><a href="https://github.com/hlbj105/NanAdmin" target="_blank">https://github.com/hlbj105/NanAdmin</a></li>
          <li><span>码云:</span><a href="https://gitee.com/hlbj105/NanAdmin" target="_blank">https://gitee.com/hlbj105/NanAdmin</a></li>
          <li><span>开发者:</span><a href="https://xn--nf1a578axkh.xn--fiqs8s/" target="_blank">Jason</a></li>
        </ol>
      </div>
    </section>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'admin',
  async asyncData () {
    let { data } = await axios.get('/api/info')
    return { info: data.data }
  },
  head () {
    return {
      title: '康诚机电 - 后台管理系统'
    }
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style scoped>
.server-main {
  margin: 10px 0 10px 20px;
  display: flex;
  -ms-align-items: flex-start;
  align-items: flex-start;
}

.server-main ol {
  width: 50%;
}

.server-main ol li {
  margin-bottom: 10px;
}

.server-main ol li:last-child {
  margin-bottom: 0;
}

.server-main ol li span {
  display: inline-block;
  width: 8em;
  margin-right: 10px;
  color: #868e96;
}
</style>
