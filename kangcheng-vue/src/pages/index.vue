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
          <li><span>github:</span><a href="https://github.com/hlbj105/kc" target="_blank">https://github.com/hlbj105/kc</a></li>
          <li><span>码云:</span><a href="https://gitee.com/hlbj105/kang_cheng" target="_blank">https://gitee.com/hlbj105/kang_cheng</a></li>
          <li><span>开发者:</span><a href="https://xn--nf1a578axkh.xn--fiqs8s/" target="_blank">Jason</a></li>
        </ol>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  head () {
    return {
      title: '康诚机电 - 后台管理系统'
    }
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      info: {
        arch: 'x64',
        cpus: [
          {
            model: 'Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz',
            speed: 2394,
            times: {
              user: 3510944500,
              nice: 32485600,
              sys: 554442100,
              idle: 176166276000,
              irq: 0
            }
          }
        ],
        endianness: 'LE',
        freemem: 84,
        homedir: '/root',
        hostname: 'instance-59w03xph',
        networkInterfaces: {
          lo: [
            {
              address: '127.0.0.1',
              netmask: '255.0.0.0',
              family: 'IPv4',
              mac: '00:00:00:00:00:00',
              internal: true,
              cidr: '127.0.0.1/8'
            },
            {
              address: '::1',
              netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
              family: 'IPv6',
              mac: '00:00:00:00:00:00',
              scopeid: 0,
              internal: true,
              cidr: '::1/128'
            }
          ],
          eth0: [
            {
              address: '172.16.0.2',
              netmask: '255.255.240.0',
              family: 'IPv4',
              mac: 'fa:16:3e:59:c8:2d',
              internal: false,
              cidr: '172.16.0.2/20'
            },
            {
              address: 'fe80::f816:3eff:fe59:c82d',
              netmask: 'ffff:ffff:ffff:ffff::',
              family: 'IPv6',
              mac: 'fa:16:3e:59:c8:2d',
              scopeid: 2,
              internal: false,
              cidr: 'fe80::f816:3eff:fe59:c82d/64'
            }
          ]
        },
        platform: 'linux',
        release: 'v10.2.1',
        tmpdir: '/tmp',
        totalmem: 993,
        uptime: '209天19小时2分钟'
      }
    }
  },
  created () {
    this.$api.get(this.$root.urlPath.MJK + '/info', {}, res => {
      // console.log(res.data)
      if (res.data.code === 200) {
        this.info = res.data.data
        console.log(res.data.data)
      } else {
        this.$message.error(res.data.msg)
      }
    })
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
