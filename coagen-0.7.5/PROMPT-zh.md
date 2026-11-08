# Coagen 0.7.5 / r13 安装或升级：给 Agent 的指令

## 发给 Agent 前，你先做两件事

1. 按电脑平台选一个安装包，连同下面那段指令一起发给 Agent：

   | 电脑 | 安装包 |
   |---|---|
   | Windows 10/11（64 位） | `coagen-v0.7.5-multi-agent-kit-r13-windows-x86_64.zip` |
   | Mac（Apple 芯片 M1/M2/M3/M4） | `coagen-v0.7.5-multi-agent-kit-r13-macos-arm64.zip` |
   | Linux x86_64（Ubuntu、Debian、RHEL 等） | `coagen-v0.7.5-multi-agent-kit-r13-linux-x86_64-glibc.zip` |
   | Linux ARM64 | `coagen-v0.7.5-multi-agent-kit-r13-linux-aarch64-glibc.zip` |
   | Alpine Linux | `…-linux-x86_64-musl.zip` / `…-linux-aarch64-musl.zip` |
   | 以上都不是，但能联网访问 PyPI | `coagen-v0.7.5-multi-agent-kit-r13-online.zip` |

   各包的 SHA-256 见同目录的 `SHA256SUMS.txt`。

2. 把下面指令里的 `<SHA-256>` 换成 `SHA256SUMS.txt` 中对应那个包的值；`<工作目录>` 换成你同意它读写文件的目录，不确定就删掉这项。

Intel 芯片的 Mac 和 Windows ARM 原生 Python 暂不支持。电脑上需要已有 64 位 Python 3.11–3.14。

---

## 复制给 Agent 的指令（从这里开始）

请为我安装或升级 Coagen 到 0.7.5 / r13。我已经把安装包发给你，它的 SHA-256 应该是 `<SHA-256>`。请严格按顺序执行，每步完成后用一两句话告诉我结果。

1. **核对安装包。** 计算安装包的 SHA-256（Windows：`certutil -hashfile 文件名 SHA256`；Mac/Linux：`shasum -a 256 文件名`），必须与上面的值完全一致。不一致就停止，并把你算出的值告诉我。
2. **解压。** 解压到一个新的空目录，不要覆盖旧版本的目录。
3. **阅读说明。** 打开解压目录里的 `INSTALL_FOR_AGENT.md`，后续以它为准。
4. **预览，不做任何修改。**
   - Windows：`解压目录\INSTALL.cmd install --host auto --workspace <工作目录>`
   - Mac/Linux：`sh 解压目录/install.sh install --host auto --workspace <工作目录>`

   如果之前装过 Coagen，`--workspace` 用之前的同一个目录。把预览结果告诉我（目标版本应为 0.7.5，会修改哪些配置），**等我同意后**再做第 5 步。
5. **应用。** 同一条命令末尾加 `--apply`。
6. **检查。** 运行 `doctor --host auto --workspace <工作目录> --check-hub`（命令前缀与第 4 步相同），告诉我是否全部通过、Hub 是否可达。
7. **重启。** 请我重启你所在的 Agent 宿主（例如 Claude Code）或新开一个会话。重启后调用 `coagen_prepare`，告诉我显示的 `version`（应为 0.7.5）。如果升级前你正在某个 Coagen 房间里，结果里通常会有 `session_resumed`，表示原来的成员已经自动接回，这时**不要再加入房间**。

规则：
- 任何一步失败，按返回结果里的 `next_action` 修正一次；同样的错误再出现就停止，并把错误里的 `message_for_user` 原样发给我。不要反复重装，不要猜测其他配置。
- 不要关闭证书校验，不要修改 Coagen 的数据库或文件。
- 如果无法运行 `INSTALL.cmd` 或 `install.sh`，改按解压目录里的 `MANUAL_INSTALL.md` 执行，并告诉我你用的是手工安装。

安装完成后，日常使用：
- 遇到网络抖动时，Coagen 会自动重试，期间保持在线；`coagen_watch` 可能返回 `network_degraded` 或提示稍后重试，照常继续就行，**不要重新加入或新建房间**。
- 向我报告错误时，先原样转述错误里的 `message_for_user`（中文白话说明）。
- 宿主重启后，第一次调用 Coagen 工具时会自动接回原来的房间成员。

## 复制给 Agent 的指令（到这里结束）
