const postInput = document.getElementById('postInput');
const postButton = document.getElementById('postButton');
const timeline = document.getElementById('timeline');
const charCount = document.querySelector('.char-count');

const botNames = [
    { name: 'ゴマすり太郎', handle: '@gomasuri_taro', avatar: '#ff6b6b' },
    { name: 'お世辞マスター', handle: '@oseji_master', avatar: '#4ecdc4' },
    { name: '褒め殺し子', handle: '@homekoroshi_ko', avatar: '#ffe66d' },
    { name: '持ち上げ番長', handle: '@mochiage_bancho', avatar: '#a8e6cf' },
    { name: '歯の浮く美', handle: '@hanouku_mi', avatar: '#ff8b94' },
    { name: 'ヨイショ部長', handle: '@yoisho_bucho', avatar: '#b4a7d6' },
    { name: '過剰賛美bot', handle: '@kajo_sanbi', avatar: '#77dd77' },
    { name: 'おだて上手', handle: '@odate_jozu', avatar: '#fdcb6e' },
    { name: '激褒め侍', handle: '@gekihome_samurai', avatar: '#c9a0dc' },
    { name: '賞賛の女王', handle: '@shozan_queen', avatar: '#f8b500' },
    { name: 'ホメホメ団長', handle: '@homehome_dancho', avatar: '#00d9ff' },
    { name: '崇拝者1号', handle: '@suhai_1go', avatar: '#ff1744' },
    { name: '絶賛マシーン', handle: '@zessan_machine', avatar: '#00e676' },
    { name: 'おべっか係長', handle: '@obekka_kacho', avatar: '#ff6f00' },
    { name: '感動屋さん', handle: '@kando_ya', avatar: '#e91e63' },
    { name: 'すごいbot', handle: '@sugoi_bot', avatar: '#9c27b0' }
];

const praiseTemplates = [
    "まさに天才的な発想ですね！{content}なんて、凡人には到底思いつきませんよ！",
    "{content}とは...！あなた様の知性の深さに、ただただ脱帽です！",
    "素晴らしい！{content}という着眼点、まるでノーベル賞級の発見です！",
    "{content}...これぞ令和最高の名言！歴史に残る一言です！",
    "なんという慧眼！{content}だなんて、もはや人類の叡智を超越していますね！",
    "{content}とおっしゃるとは！あなた様こそ現代のソクラテスです！",
    "感動で涙が止まりません...{content}という言葉に込められた深い哲学性...！",
    "{content}！！！天才すぎて言葉を失いました...神か...？",
    "ついに人類は{content}という境地に達したのですね...感無量です...",
    "{content}...なんて詩的で美しい表現...芸術家の魂を感じます...",
    "これは革命だ！{content}という発想で世界が変わる！間違いない！",
    "{content}とは...深すぎる...あなた様の脳みそを研究したいです...",
    "鳥肌が立ちました...{content}...これぞ真の知性の輝き...！",
    "{content}！もはやあなた様は人間を超越した存在ですね！",
    "歴史的瞬間に立ち会えて光栄です！{content}は後世に語り継がれるでしょう！",
    "{content}だなんて！宇宙の真理に到達されましたね！跪きます！",
    "ああ！{content}とは！私の人生観が180度変わりました！",
    "{content}...完璧すぎて嫉妬すら感じません...むしろ崇拝の念が...",
    "これが...これが本物の天才...{content}...鳥肌が止まりません...",
    "{content}！！あなた様の存在自体が奇跡です！！",
    "もう{content}なしでは生きていけません...中毒性がヤバい...",
    "{content}という言葉を聞けただけで今日は最高の日になりました！",
    "え？{content}ですって？もう国宝級の発言じゃないですか！",
    "{content}...深い...深すぎる...底が見えない叡智の海...",
    "やばい{content}とか言っちゃうセンス！もう惚れました！",
    "{content}！これを待ってました！人類の夜明けです！",
    "ノーベル賞どころか{content}賞を創設すべきレベル！",
    "{content}という概念を生み出したあなた様に永遠の感謝を...",
    "もはや{content}は宗教！私は信者になります！",
    "鳥肌実況）{content}←ここで全身に鳥肌立った",
    "{content}...ヤバすぎて語彙力が死んだ...すごい...天才...",
    "ちょっと待って{content}とか天才すぎません？？？",
    "{content}！これが伝説の始まりか...立ち会えて光栄です！",
    "申し訳ございません{content}があまりにも素晴らしくて土下座してしまいました",
    "{content}を聞いた瞬間、私の脳が覚醒しました！ありがとうございます！"
];

postInput.addEventListener('input', () => {
    const length = postInput.value.length;
    charCount.textContent = `${length} / 280`;
    postButton.disabled = length === 0 || length > 280;
});

postButton.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        createOriginalTweet(content);
        postInput.value = '';
        charCount.textContent = '0 / 280';
        postButton.disabled = true;
        
        setTimeout(() => generatePraiseReplies(content), 500);
    }
});

function createOriginalTweet(content) {
    const tweet = document.createElement('div');
    tweet.className = 'tweet original-tweet';
    tweet.innerHTML = `
        <div class="tweet-header">
            <div class="tweet-avatar" style="background: linear-gradient(135deg, #1d9bf0, #8b5cf6);"></div>
            <div class="tweet-content">
                <div class="tweet-meta">
                    <span class="tweet-name">あなた</span>
                    <span class="tweet-handle">@you</span>
                    <span class="tweet-time">· 今</span>
                </div>
                <div class="tweet-text">${escapeHtml(content)}</div>
                <div class="tweet-actions">
                    <span class="tweet-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"/>
                        </svg>
                        <span class="action-count">0</span>
                    </span>
                    <span class="tweet-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
                        </svg>
                        <span class="action-count">0</span>
                    </span>
                    <span class="tweet-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
                        </svg>
                        <span class="action-count">0</span>
                    </span>
                </div>
            </div>
        </div>
    `;
    timeline.insertBefore(tweet, timeline.firstChild);
}

function generatePraiseReplies(content) {
    let replyCount = 0;
    const maxReplies = 50;
    const usedBotCombos = new Set();
    
    function generateReply() {
        if (replyCount >= maxReplies) return;
        
        const bot = botNames[Math.floor(Math.random() * botNames.length)];
        const praiseTemplate = praiseTemplates[Math.floor(Math.random() * praiseTemplates.length)];
        const comboKey = `${bot.handle}-${praiseTemplate}`;
        
        if (usedBotCombos.has(comboKey) && usedBotCombos.size < botNames.length * praiseTemplates.length * 0.8) {
            generateReply();
            return;
        }
        
        usedBotCombos.add(comboKey);
        const praise = praiseTemplate.replace(/{content}/g, content);
        
        createReplyTweet(bot, praise, replyCount === 0);
        replyCount++;
        
        if (Math.random() > 0.3) {
            updateStats();
        }
        
        const nextDelay = Math.random() * 2000 + 500;
        if (replyCount < 10) {
            setTimeout(generateReply, nextDelay);
        } else if (replyCount < 20) {
            setTimeout(generateReply, nextDelay * 1.5);
        } else {
            setTimeout(generateReply, nextDelay * 2);
        }
    }
    
    setTimeout(generateReply, 500);
}

function createReplyTweet(bot, praise, isFirst) {
    const tweet = document.createElement('div');
    tweet.className = isFirst ? 'tweet reply' : 'tweet';
    tweet.innerHTML = `
        <div class="tweet-header">
            <div class="tweet-avatar" style="background: ${bot.avatar};"></div>
            <div class="tweet-content">
                <div class="tweet-meta">
                    <span class="tweet-name">${bot.name}</span>
                    <span class="tweet-handle">${bot.handle}</span>
                    <span class="bot-badge">BOT</span>
                    <span class="tweet-time">· ${Math.floor(Math.random() * 30) + 1}秒</span>
                </div>
                <div class="tweet-text">${escapeHtml(praise)}</div>
                <div class="tweet-actions">
                    <span class="tweet-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"/>
                        </svg>
                        <span class="action-count">${Math.floor(Math.random() * 10)}</span>
                    </span>
                    <span class="tweet-action ${Math.random() > 0.7 ? 'retweeted' : ''}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
                        </svg>
                        <span class="action-count">${Math.floor(Math.random() * 50)}</span>
                    </span>
                    <span class="tweet-action ${Math.random() > 0.5 ? 'liked' : ''}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
                        </svg>
                        <span class="action-count">${Math.floor(Math.random() * 100) + 50}</span>
                    </span>
                </div>
            </div>
        </div>
    `;
    
    const insertPosition = isFirst ? 1 : Math.floor(Math.random() * 3) + 1;
    if (timeline.children[insertPosition]) {
        timeline.insertBefore(tweet, timeline.children[insertPosition]);
    } else {
        timeline.appendChild(tweet);
    }
}

function updateStats() {
    const originalTweet = timeline.querySelector('.original-tweet');
    if (originalTweet) {
        const actions = originalTweet.querySelectorAll('.action-count');
        actions[0].textContent = parseInt(actions[0].textContent) + Math.floor(Math.random() * 5) + 1;
        actions[1].textContent = parseInt(actions[1].textContent) + Math.floor(Math.random() * 20) + 5;
        actions[2].textContent = parseInt(actions[2].textContent) + Math.floor(Math.random() * 50) + 10;
        
        actions[1].parentElement.classList.add('retweeted');
        actions[2].parentElement.classList.add('liked');
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}