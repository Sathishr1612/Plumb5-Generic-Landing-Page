const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const set1Match = content.match(/(<!-- SET 1 -->[\s\S]*?)<!-- DUPLICATE SET 1 FOR SEAMLESS LOOP -->/);
if (set1Match) {
    const set1 = set1Match[1];
    content = content.replace(/<!-- DUPLICATE SET 1 FOR SEAMLESS LOOP -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Row 2:/,
        '<!-- DUP 1 -->\n' + set1 + '<!-- DUP 2 -->\n' + set1 + '<!-- DUP 3 -->\n' + set1 + '</div>\n      </div>\n\n      <!-- Row 2:');
}

const set2Match = content.match(/(<!-- SET 2 -->[\s\S]*?)<!-- DUPLICATE SET 2 FOR SEAMLESS LOOP -->/);
if (set2Match) {
    const set2 = set2Match[1];
    content = content.replace(/<!-- DUPLICATE SET 2 FOR SEAMLESS LOOP -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
        '<!-- DUP 1 -->\n' + set2 + '<!-- DUP 2 -->\n' + set2 + '<!-- DUP 3 -->\n' + set2 + '        </div>\n      </div>\n\n    </div>\n  </section>');
}

fs.writeFileSync('index.html', content);
console.log('done');
