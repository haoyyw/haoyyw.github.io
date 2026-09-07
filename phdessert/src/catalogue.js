// Catalogue data and section ordering
export const PRODUCTS = [
  {
    id:'peach-blossom-pastry', section:'chinese',
    en:{name:'Peach Blossom Pastry', description:'Flaky flower-shaped pastry with a smooth red-bean centre and delicate rose notes.', selling:'Layered, crisp and gently floral.'},
    zh:{name:'桃花酥', description:'层层酥皮包裹细腻红豆馅，带轻柔花香。', selling:'酥而不腻，花香清雅。'},
    image:'assets/products/peach-blossom-pastry.webp'
  },
  {
    id:'osmanthus-cake', section:'chinese',
    en:{name:'Osmanthus Cake', description:'Soft osmanthus-scented cake with a clean floral finish and gentle sweetness.', selling:'Fragrant, delicate and quietly sweet.'},
    zh:{name:'桂花糕', description:'桂花香气清透，口感柔软，甜度轻盈。', selling:'花香干净，细腻不厚重。'},
    image:'assets/products/osmanthus-cake.webp'
  },
  {
    id:'taiwanese-taro-pastry', section:'chinese',
    en:{name:'Taiwanese Taro Pastry', description:'Spiral pastry wrapped around a silky taro filling with mellow, nutty sweetness.', selling:'Buttery layers and a smooth taro centre.'},
    zh:{name:'台式芋头酥', description:'层层旋纹酥皮包裹细滑芋泥，香气柔和。', selling:'酥皮分明，芋香绵密。'},
    image:'assets/products/taiwanese-taro-pastry.webp'
  },
  {
    id:'pork-floss-sponge', section:'chinese',
    en:{name:'Pork Floss Sponge Cake', description:'Cloud-soft sponge with savoury pork floss and a creamy centre.', selling:'Sweet-savoury, soft and deeply comforting.'},
    zh:{name:'肉松小贝', description:'松软蛋糕体搭配咸香肉松和细腻奶香夹心。', selling:'咸甜平衡，松软轻盈。'},
    image:'assets/products/pork-floss-sponge.webp'
  },
  {
    id:'mung-bean-cake', section:'chinese',
    en:{name:'Mung Bean Cake', description:'Fine mung bean paste pressed into floral moulds for a smooth, delicate bite.', selling:'Mellow, fine-textured and naturally gentle.'},
    zh:{name:'绿豆糕', description:'细腻绿豆馅压制成花纹小糕，入口绵密。', selling:'豆香清爽，细腻温润。'},
    image:'assets/products/mung-bean-cake.webp'
  },
  {
    id:'steamed-rice-cake', section:'chinese',
    en:{name:'Steamed Rice Cake', description:'Pure rice batter steamed into a soft, gently springy cake with a clean rice aroma.', selling:'Simple, soft and quietly comforting.'},
    zh:{name:'纯大米糕', description:'以大米为主的小蒸糕，口感柔软微弹，米香清晰。', selling:'配方干净，米香自然。'},
    image:'assets/products/steamed-rice-cake.webp'
  },
  {
    id:'honey-cake', section:'chinese',
    en:{name:'Honey Cake', description:'Moist sponge layered with rounded honey aroma and a soft, tender crumb.', selling:'Amber sweetness with a light finish.'},
    zh:{name:'蜂蜜蛋糕', description:'湿润松软的蛋糕体带温柔蜂蜜香，口感细腻。', selling:'蜜香圆润，甜度克制。'},
    image:'assets/products/honey-cake.webp'
  },
  {
    id:'double-skin-milk-pudding', section:'chinese',
    en:{name:'Double-Skin Milk Pudding', description:'Silky Cantonese-style milk pudding served chilled with a clean dairy flavour.', selling:'Milk-forward, delicate and soothing.'},
    zh:{name:'双皮奶', description:'冷藏呈现的细滑奶香甜品，口感柔嫩顺滑。', selling:'奶香突出，细嫩清爽。'},
    image:'assets/products/double-skin-milk-pudding.webp'
  },
  {
    id:'palmier', section:'patisserie',
    en:{name:'Palmier', description:'Laminated butter pastry caramelised into crisp, golden heart-shaped layers.', selling:'Crisp, buttery and deeply caramelised.'},
    zh:{name:'蝴蝶酥', description:'黄油开酥后烤至金黄焦糖化，层次轻脆。', selling:'酥脆浓香，焦糖感清晰。'},
    image:'assets/products/palmier.webp'
  },
  {
    id:'lemon-bavarois', section:'patisserie',
    en:{name:'Lemon Bavarois', description:'Light lemon bavarois with fresh citrus acidity and a smooth, airy texture.', selling:'Silky, bright and clean on the finish.'},
    zh:{name:'柠檬巴巴露亚', description:'轻盈柠檬巴巴露亚，酸香明亮，质地柔滑。', selling:'酸甜清爽，口感轻盈。'},
    image:'assets/products/lemon-bavarois.webp'
  },
  {
    id:'tiramisu', section:'patisserie',
    en:{name:'Tiramisu', description:'Coffee-soaked sponge, airy mascarpone cream and a fine dusting of cocoa.', selling:'Deep coffee, soft mascarpone, restrained sweetness.'},
    zh:{name:'提拉米苏', description:'咖啡浸润蛋糕体搭配轻盈马斯卡彭奶油和可可。', selling:'咖啡浓郁，奶香轻柔。'},
    image:'assets/products/tiramisu.webp'
  },
  {
    id:'yuzu-lemon-mousse', section:'patisserie',
    en:{name:'Yuzu Lemon Cheesecake Mousse', description:'Yuzu and lemon folded through a creamy cheesecake mousse with a crisp base.', selling:'Citrus-led, creamy and precise.'},
    zh:{name:'柚子柠檬乳酪慕斯蛋糕', description:'柚子和柠檬融入乳酪慕斯，搭配轻脆底层。', selling:'柑橘明亮，乳酪细滑。'},
    image:'assets/products/yuzu-lemon-mousse.webp'
  },
  {
    id:'classic-basque', section:'basque',
    en:{name:'Classic Basque Cheesecake', description:'Deeply caramelised outside with a soft, creamy cheesecake centre.', selling:'Burnished edges, custardy middle.'},
    zh:{name:'原味巴斯克', description:'表面焦香浓郁，内部保持柔软细腻的乳酪质地。', selling:'焦香外层，流心般柔滑。'},
    image:'assets/products/classic-basque.webp'
  },
  {
    id:'cocoa-basque', section:'basque',
    en:{name:'Cocoa Basque Cheesecake', description:'Dark cocoa folded into a rich Basque cheesecake with a burnished top.', selling:'Deep chocolate, creamy centre, low sweetness.'},
    zh:{name:'可可巴斯克', description:'深可可融入浓郁乳酪体，表层烤出焦香。', selling:'可可醇厚，甜度克制。'},
    image:'assets/products/cocoa-basque.webp'
  },
  {
    id:'matcha-basque', section:'basque',
    en:{name:'Matcha Basque Cheesecake', description:'Matcha brings gentle bitterness and tea fragrance to the creamy Basque centre.', selling:'Tea-forward, earthy and balanced.'},
    zh:{name:'抹茶巴斯克', description:'抹茶的微苦和茶香融进细腻巴斯克乳酪体。', selling:'茶味突出，浓郁平衡。'},
    image:'assets/products/matcha-basque.webp'
  },
  {
    id:'pistachio-basque', section:'basque',
    en:{name:'Pistachio Basque Cheesecake', description:'Roasted pistachio enriches the creamy centre beneath a deeply caramelised top.', selling:'Nutty, aromatic and luxuriously smooth.'},
    zh:{name:'开心果巴斯克', description:'开心果香融入乳酪体，表面焦香浓郁。', selling:'坚果香饱满，质地顺滑。'},
    image:'assets/products/pistachio-basque.webp'
  },
  {
    id:'matcha-yuzu-basque', section:'basque',
    en:{name:'Matcha Yuzu Basque Cheesecake', description:'Earthy matcha and bright yuzu meet in a creamy, caramelised Basque cheesecake.', selling:'Tea depth with a clean citrus lift.'},
    zh:{name:'抹茶柚子巴斯克', description:'抹茶茶香和柚子清酸融入焦香巴斯克。', selling:'茶香深，柑橘收尾清亮。'},
    image:'assets/products/matcha-yuzu-basque.webp'
  },
  {
    id:'jasmine-grape-matcha-cake', section:'cakes',
    en:{name:'Jasmine Grape Matcha Cream Cake', description:'Jasmine-scented cream, fresh green grape and matcha layered into a light cream cake.', selling:'Floral, fresh and gently tea-led.'},
    zh:{name:'茉莉青提抹茶奶油蛋糕', description:'茉莉奶油、清甜青提和抹茶组合成轻盈层次。', selling:'花香清透，茶果平衡。'},
    image:'assets/products/jasmine-grape-matcha-cake.webp'
  },
  {
    id:'coconut-angel-roll', section:'cakes',
    en:{name:'Coconut Angel Roll', description:'Feather-light sponge rolled with coconut cream and a soft toasted coconut finish.', selling:'Airy, milky and softly tropical.'},
    zh:{name:'椰子天使卷', description:'轻盈蛋糕卷搭配椰香奶油和细碎椰香。', selling:'轻软奶香，椰味温柔。'},
    image:'assets/products/coconut-angel-roll.webp'
  },
  {
    id:'matcha-fig-cake', section:'cakes', seasonal:true,
    en:{name:'Matcha Fig Cake', description:'Matcha cream, fresh fig and pistachio arranged in a soft, fruit-led cake.', selling:'Earthy, fruit-led and deliberately restrained in sweetness.'},
    zh:{name:'抹茶无花果蛋糕', description:'抹茶、鲜无花果和开心果组成柔和层次。', selling:'茶香清苦，果香柔和，甜度克制。'},
    image:'assets/products/matcha-fig-cake.webp'
  },
  {
    id:'matcha-yuzu-cheesecake', section:'cakes',
    en:{name:'Matcha Yuzu Cheesecake', description:'Creamy cheesecake layered with matcha and a bright yuzu finish.', selling:'Silky tea notes with fresh citrus lift.'},
    zh:{name:'抹茶柚子芝士蛋糕', description:'细滑芝士蛋糕结合抹茶和清亮柚子香。', selling:'茶香柔和，柚香提亮。'},
    image:'assets/products/matcha-yuzu-cheesecake.webp'
  },
  {
    id:'mango-pomelo-coconut-cake', section:'cakes',
    en:{name:'Coconut Jelly Mango Pomelo Cake', description:'Mango, pomelo and coconut jelly layered into a bright tropical cream cake.', selling:'Juicy fruit, soft coconut and refreshing texture.'},
    zh:{name:'椰奶冻冻杨枝甘露蛋糕', description:'芒果、柚子和椰奶冻组成清爽热带风味。', selling:'果香充足，椰香柔滑。'},
    image:'assets/products/mango-pomelo-coconut-cake.webp'
  },
  {
    id:'light-cheesecake', section:'cakes',
    en:{name:'Light Cheesecake', description:'A soft, airy cheesecake with delicate dairy richness and a feather-light crumb.', selling:'Cloud-soft, milky and easy to finish.'},
    zh:{name:'轻乳酪蛋糕', description:'轻盈柔软的乳酪蛋糕，奶香细腻，组织蓬松。', selling:'云朵般轻软，奶香干净。'},
    image:'assets/products/light-cheesecake.webp'
  },
  {
    id:'strawberry-fresh-cream-cake', section:'cakes',
    en:{name:'Strawberry Fresh Cream Cake', description:'Fresh strawberries, soft sponge and lightly sweetened cream in a classic celebration cake.', selling:'Fresh fruit, light cream, timeless balance.'},
    zh:{name:'草莓鲜奶蛋糕', description:'新鲜草莓、柔软蛋糕体和轻甜鲜奶油组成经典奶油蛋糕。', selling:'果香新鲜，奶油轻盈。'},
    image:'assets/products/strawberry-fresh-cream-cake.webp'
  },
  {
    id:'fig-cheesecake', section:'cakes', seasonal:true,
    en:{name:'Fig Cheesecake', description:'Creamy cheesecake topped with ripe fig and a warm, gently caramelised fruit finish.', selling:'Creamy, mellow and fruit-forward.'},
    zh:{name:'无花果芝士蛋糕', description:'细滑芝士蛋糕搭配成熟无花果和温柔焦糖果香。', selling:'乳酪绵密，果香成熟。'},
    image:'assets/products/fig-cheesecake.webp'
  },
  {
    id:'blueberry-cake', section:'cakes', seasonal:true,
    en:{name:'Blueberry Cake', description:'Blueberry compote and fresh berries layered with light cream and a crisp biscuit base.', selling:'Berry-rich, bright and creamy.'},
    zh:{name:'蓝莓蛋糕', description:'蓝莓果酱和新鲜蓝莓搭配轻盈奶油和脆香饼底。', selling:'莓果浓郁，酸甜清亮。'},
    image:'assets/products/blueberry-cake.webp'
  },
  {
    id:'yoghurt-bowl', section:'small-desserts',
    en:{name:'Yoghurt Bowl', description:'Thick yoghurt finished with fresh berries, granola, nuts and a light honey drizzle.', selling:'Fresh, textured and easy-going.'},
    zh:{name:'酸奶碗', description:'浓稠酸奶搭配新鲜莓果、燕麦坚果和少量蜂蜜。', selling:'清爽有层次，适合轻食时刻。'},
    image:'assets/products/yoghurt-bowl.webp'
  }
];

PRODUCTS.forEach((product, index) => {
  product.spriteX = (index % 7) * (100 / 6);
  product.spriteY = Math.floor(index / 7) * (100 / 3);
});

export const MENU_SECTIONS = [
  {id:'chinese', index:'01', en:{title:'Chinese Handcrafted', subtitle:'Pastries and familiar flavours, made by hand in Sheffield'}, zh:{title:'中式手作', subtitle:'在谢菲尔德手工制作的中式糕点和熟悉风味'}},
  {id:'patisserie', index:'02', en:{title:'Pâtisserie', subtitle:'French-inspired pastry, mousse and café classics'}, zh:{title:'法式甜点', subtitle:'法式灵感糕点、慕斯和咖啡甜点'}},
  {id:'basque', index:'03', en:{title:'Basque Collection', subtitle:'Five takes on the deeply caramelised cheesecake'}, zh:{title:'巴斯克系列', subtitle:'五种焦香巴斯克乳酪风味'}},
  {id:'cakes', index:'04', en:{title:'Cakes', subtitle:'Cream cakes, cheesecakes and celebration pieces'}, zh:{title:'蛋糕系列', subtitle:'奶油蛋糕、芝士蛋糕和庆祝蛋糕'}},
  {id:'small-desserts', index:'05', en:{title:'Small Desserts', subtitle:'Lighter individual desserts and bowls'}, zh:{title:'小甜品', subtitle:'轻盈单份甜品和小食'}}
];

export const SEASONAL_IDS = ['matcha-fig-cake','fig-cheesecake','blueberry-cake'];
