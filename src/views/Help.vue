<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Help</VCardTitle>
          <VDivider />
          <VCardText>
            <article class="pl-4">
              <ul>
                <li>
                  容器实例只能使用 EXEC 功能，不能使用 CONSOLE 和 SPICE 功能；
                </li>
                <li>
                  虚拟机实例使用 CONSOLE 和 SPICE 功能前，请先使用 EXEC 功能执行
                  bash，并通过 passwd 设置密码。CONSOLE
                  会出现空白一片的情况，按一个回车就会提示输入用户名；如果 SPICE
                  界面只显示一个 lxd 的图标，可以尝试点击页面上方的 Send
                  Ctrl+Alt+F1，切换到 tty1；
                </li>
                <li>
                  虚拟机实例的分区默认为约
                  4GB，需要手工扩容到分配的实例大小；相关命令：growpart /dev/sda
                  2，resize2fs /dev/sda2 你想要扩容到的大小，例如大小可以填写
                  14G；
                </li>
                <li>容器实例不支持启停时的 stateful 选项；</li>
                <li>
                  建议使用北大校内镜像源，更换指令：sed
                  's/archive.ubuntu.com/mirrors.pku.edu.cn/g' -i
                  /etc/apt/sources.list 并 apt update；
                </li>
                <li>
                  WebDAV 服务可能无法直接使用 Windows
                  资源管理器挂载为网络驱动器；建议 Windows 用户使用 WinSCP 作为
                  WebDAV 客户端。
                </li>
              </ul>
            </article>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
