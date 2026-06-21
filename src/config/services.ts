import type { Lang } from '../i18n/ui';

export interface ServiceArea {
	slug: string;
	title: string;
	tag: string;
	relatedTags?: string[];
	description: string;
	icon: string;
	heroTitle: string;
	heroSummary: string;
	sections: { heading: string; text: string }[];
	faq: { q: string; a: string }[];
	seoTitle: string;
	seoDescription: string;
}

export const serviceAreasTr: ServiceArea[] = [
	{
		slug: 'aile-hukuku',
		title: 'Aile Hukuku',
		tag: 'aile-hukuku',
		description:
			'Boşanma, velayet, nafaka ve mal rejimi davaları başta olmak üzere aile hukuku kaynaklı uyuşmazlıklarda hukuki danışmanlık ve dava takibi.',
		icon: 'family',
		heroTitle: 'Aile Hukuku',
		heroSummary:
			'Boşanma, velayet, nafaka ve mal rejimi davalarında yanınızdayız. Aile hukuku kaynaklı uyuşmazlıklarınızda hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Boşanma Davaları',
				text: 'Anlaşmalı ve çekişmeli boşanma davaları sürecinde müvekkillerimizi temsil ediyoruz. Anlaşmalı boşanma protokolünün hazırlanması, çekişmeli boşanmada delil toplama ve duruşma takibi başta olmak üzere boşanmanın tüm hukuki boyutlarında destek sağlıyoruz. Maddi ve manevi tazminat talepleri, nafaka düzenlemeleri ve velayet düzenlemeleri boşanma sürecinin kritik unsurları arasında yer alır.',
			},
			{
				heading: 'Velayet ve Kişisel İlişki Düzenlemeleri',
				text: 'Çocuğun üstün yararı ilkesi çerçevesinde velayet düzenlemeleri ve kişisel ilişki tesisinde hukuki danışmanlık veriyoruz. Velayetin kaldırılması, değiştirilmesi ve çocukla kişisel ilişki kurulması taleplerinde mahkeme nezdinde gerekli başvuru ve takipleri yürütüyoruz.',
			},
			{
				heading: 'Mal Rejimi Tasfiyesi',
				text: 'Edinilmiş mallara katılma rejimi kapsamında mal rejiminin tasfiyesi davalarında müvekkillerimizi temsil ediyoruz. Evlilik birliği içinde edinilen malların tespiti, değerlemesi ve paylaştırılması sürecinde hukuki danışmanlık sağlıyoruz.',
			},
			{
				heading: 'Nafaka Türleri',
				text: 'Yoksulluk nafakası, iştirak nafakası ve tedbir nafakası taleplerinde danışmanlık veriyoruz. Nafaka miktarının belirlenmesi, değişen koşullara göre nafakanın artırılması veya kaldırılması taleplerinde mahkeme sürecini yürütüyoruz.',
			},
			{
				heading: 'Aile Arabuluculuğu',
				text: 'Aile hukuku uyuşmazlıklarında arabuluculuk sürecinde müvekkillerimize eşlik ediyoruz. Özellikle boşanma ve velayet konularında arabuluculuk, tarafların anlaşarak süreci daha kısa ve düşük maliyetle tamamlamasına imkan tanır.',
			},
		],
		faq: [
			{
				q: 'Anlaşmalı boşanma ne kadar sürer?',
				a: 'Anlaşmalı boşanma davaları genellikle 2-3 ay içinde sonuçlanır. Tarafların boşanma protokolünde tüm hususlarda anlaşması halinde tek celsede karar verilebilir.',
			},
			{
				q: 'Velayet davasında çocuğun görüşü dikkate alınır mı?',
				a: 'Evet, çocuğun yaşı ve olgunluk düzeyine göre görüşü alınır. TMK m.339 uyarınca çocuk dinlenir ve pedagog/psikolog raporu doğrultusunda karar verilir.',
			},
			{
				q: 'Boşanma davasında hangi nafaka türlerine hükmedilebilir?',
				a: 'Tedbir nafakası (dava süresince), yoksulluk nafakası (boşanma sonrası) ve iştirak nafakası (çocuk için) olmak üzere üç farklı nafaka türü bulunur. Her birinin şartları ve süreleri farklıdır.',
			},
			{
				q: 'Mal rejimi tasfiyesinde hangi mallar paylaşılır?',
				a: 'Edinilmiş mallar (evlilik süresince edinilen malvarlığı) tasfiyeye tabidir. Kişisel mallar (evlenmeden önceki malvarlığı, miras yoluyla edinilenler) kapsam dışındadır.',
			},
		],
		seoTitle: 'Aile Hukuku Avukatı | Boşanma, Velayet ve Nafaka Davaları',
		seoDescription:
			'Boşanma, velayet, nafaka ve mal rejimi davalarında uzman aile hukuku avukatı. İstanbul merkezli Balabanlı Hukuk Bürosu hukuki danışmanlık sunar.',
	},
	{
		slug: 'miras-hukuku',
		title: 'Miras Hukuku',
		tag: 'miras-hukuku',
		description:
			'Veraset ilamı, vasiyetname düzenlenmesi, tenkis davası, muris muvazaası ve mirasın reddi işlemlerinde hukuki destek.',
		icon: 'scroll',
		heroTitle: 'Miras Hukuku',
		heroSummary:
			'Miras paylaşımı, vasiyetname düzenlemesi, tenkis davası ve muris muvazaası gibi miras hukuku alanında kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Veraset İlamı (Mirasçılık Belgesi)',
				text: 'Mirasçılık belgesi alınması sürecinde danışmanlık veriyoruz. Noterden veya Sulh Hukuk Mahkemesinden veraset ilamı çıkarılması, mirasçıların ve pay oranlarının resmi olarak belirlenmesi işlemlerini yürütüyoruz.',
			},
			{
				heading: 'Vasiyetname Düzenlenmesi',
				text: 'Resmi vasiyetname, el yazısı vasiyetname ve sözlü vasiyetname türlerinde danışmanlık ve düzenleme desteği sağlıyoruz. Vasiyetnamenin geçerlilik şartları ve şekil kuralları konusunda müvekkillerimizi bilgilendiriyor, hukuka uygun vasiyetname hazırlanmasına yardımcı oluyoruz.',
			},
			{
				heading: 'Tenkis Davası',
				text: 'Saklı pay sahibi mirasçıların haklarının korunması amacıyla tenkis davası açılması ve takibi konusunda hukuki hizmet veriyoruz. Miras bırakanın tasarruf oranını aşan bağışlama ve diğer işlemlerin iptali için gerekli dava sürecini yürütüyoruz.',
			},
			{
				heading: 'Muris Muvazaası Davası',
				text: 'Miras bırakanın mirastan mal kaçırma amacıyla yaptığı muvazaalı işlemlerin tespiti ve iptali için muris muvazaası davalarında müvekkillerimizi temsil ediyoruz. Tapu iptal ve tescil talepli davalarda ispat yükü ve zamanaşımı konularında danışmanlık sağlıyoruz.',
			},
			{
				heading: 'Mirasın Reddi',
				text: 'Mirasın gerçek reddi ve yasal reddi süreçlerinde danışmanlık veriyoruz. Mirasın reddi süresi, dilekçe hazırlığı ve Sulh Hukuk Mahkemesine başvuru işlemlerini yürütüyoruz.',
			},
		],
		faq: [
			{
				q: 'Veraset ilamı ne kadar sürede çıkar?',
				a: 'Noter başvurularında genellikle 1-2 hafta içinde veraset ilamı düzenlenir. Mahkeme yoluyla alınması halinde süre 1-3 ay arasında değişebilir.',
			},
			{
				q: 'Tenkis davası açma süresi nedir?',
				a: 'Tenkis davası, mirasçının haklarından haberdar olduğu tarihten itibaren 1 yıl, her halde vasiyetnamenin açılmasından itibaren 10 yıl içinde açılmalıdır.',
			},
			{
				q: 'Mirasın reddi için kaç gün süre vardır?',
				a: 'Miras bırakanın ölümünü öğrenme tarihinden itibaren 3 ay içinde mirasın reddi için sulh hukuk mahkemesine başvurulmalıdır.',
			},
			{
				q: 'El yazısı vasiyetname geçerli midir?',
				a: 'Evet, el yazısı vasiyetname TMK m.538 uyarınca geçerlidir. Ancak tamamen el yazısı ile yazılması, imzalanması ve tarih atılması zorunludur. Şekil şartlarına uyulmaması vasiyetnamenin iptaline yol açar.',
			},
		],
		seoTitle: 'Miras Hukuku Avukatı | Veraset İlamı, Tenkis ve Vasiyetname',
		seoDescription:
			'Miras hukuku alanında uzman avukat. Veraset ilamı, vasiyetname, tenkis davası, muris muvazaası ve mirasın reddi işlemlerinde hukuki destek. İstanbul merkezli hizmet.',
	},
	{
		slug: 'sirketler-hukuku',
		title: 'Şirketler Hukuku',
		tag: 'sirketler-hukuku',
		description:
			'Limited ve anonim şirket kuruluşu, ortaklık sözleşmeleri, yönetim kurulu kararları ve hisse devir işlemleri.',
		icon: 'building',
		heroTitle: 'Şirketler Hukuku',
		heroSummary:
			'Şirket kuruluşu, ortaklık sözleşmeleri, hisse devirleri ve yönetim kurulu kararları başta olmak üzere şirketler hukuku alanında kapsamlı hukuki danışmanlık hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Şirket Kuruluşu',
				text: 'Limited ve anonim şirket kuruluş süreçlerinin tamamında danışmanlık veriyoruz. Esas sözleşme hazırlığı, MERSİS kaydı, ticaret sicil başvurusu ve kuruluş sonrası yasal yükümlülükler konusunda müvekkillerimize rehberlik ediyoruz.',
			},
			{
				heading: 'Ortaklık Sözleşmeleri',
				text: 'Şirket ortakları arasındaki ilişkileri düzenleyen ortaklık sözleşmelerinin hazırlanması ve incelenmesi hizmeti veriyoruz. Kar paylaşımı, oy hakları, ayrılma koşulları ve uyuşmazlık çözüm mekanizmalarının sözleşmeye bağlanması ileride çıkabilecek anlaşmazlıkları önler.',
			},
			{
				heading: 'Hisse Devri ve Birleşme',
				text: 'Hisse devir sözleşmelerinin hazırlanması, pay defteri güncellemesi ve ticaret sicil tescil işlemlerinde danışmanlık sağlıyoruz. Şirket birleşme, bölünme ve tür değiştirme işlemlerinde hukuki süreci yürütüyoruz.',
			},
			{
				heading: 'Yönetim Kurulu ve Genel Kurul',
				text: 'Yönetim kurulu ve genel kurul toplantılarının usulüne uygun yapılması, kararların yazılması ve tescil işlemleri konusunda danışmanlık veriyoruz. Yönetim kurulu üyelerinin hukuki sorumlulukları ve riskleri hakkında bilgilendirme yapıyoruz.',
			},
		],
		faq: [
			{
				q: 'Limited şirket kuruluşu ne kadar sürer?',
				a: 'Limited şirket kuruluşu ortalama 1-2 hafta içinde tamamlanır. MERSİS başvurusu, noter onayı ve ticaret sicil tescil süreçleri hızlı ilerler.',
			},
			{
				q: 'Anonim şirket için minimum sermaye şartı nedir?',
				a: '2024 yılı itibarıyla anonim şirketler için asgari sermaye tutarı 250.000 TL\'dir. Bu tutarın en az dörtte birinin tescil anında ödenmesi zorunludur.',
			},
			{
				q: 'Ortaklık anlaşmazlığında hangi hukuki yollara başvurulabilir?',
				a: 'Arabuluculuk, tahkim, ortaklıktan çıkma davası ve şirketin feshi davası başlıca hukuki çözüm yollarıdır. İlk aşamada arabuluculuk denenmesi önerilir.',
			},
			{
				q: 'Yönetim kurulu üyelerinin hukuki sorumluluğu nedir?',
				a: 'Yönetim kurulu üyeleri, görevlerini ifa ederken kusurlarıyla sebep oldukları zararlardan şirkete, ortaklara ve alacaklılara karşı sorumludur. Sorumluluk süresi zararın öğrenilmesinden itibaren 2 yıl, her halde 5 yıldır.',
			},
		],
		seoTitle: 'Şirketler Hukuku Avukatı | Kuruluş, Ortaklık ve Hisse Devri',
		seoDescription:
			'Limited ve anonim şirket kuruluşu, ortaklık sözleşmeleri, hisse devri ve yönetim kurulu kararları alanında uzman avukat. İstanbul merkezli danışmanlık.',
	},
	{
		slug: 'fikri-mulkiyet',
		title: 'Fikri Mülkiyet',
		tag: 'fikri-mulkiyet',
		description:
			'Marka tescili ve korunması, patent başvurusu, endüstriyel tasarım ve fikri mülkiyet haklarının ihlali durumunda hukuki başvuru yolları.',
		icon: 'bulb',
		heroTitle: 'Fikri Mülkiyet Hukuku',
		heroSummary:
			'Marka tescili, patent başvurusu, endüstriyel tasarım ve fikri mülkiyet haklarının korunması alanında kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Marka Tescili ve Korunması',
				text: 'Marka başvurusu hazırlığı, Nice sınıflandırması, TÜRKPATENT başvuru süreci ve itiraz takibi konularında danışmanlık veriyoruz. Marka tescili sonrası markanın kullanımı, yenileme ve korunmasına yönelik stratejik danışmanlık sağlıyoruz.',
			},
			{
				heading: 'Patent ve Faydalı Model',
				text: 'Patent başvurusu sürecinde incelemeli ve incelemesiz patent seçenekleri, faydalı model başvurusu, araştırma raporu ve TÜRKPATENT ile yazışmalar konusunda hukuki destek sunuyoruz.',
			},
			{
				heading: 'Fikri Mülkiyet İhlalleri',
				text: 'Marka hakkı ihlali, patent ihlali ve tasarım hakkı ihlali durumlarında ihtiyati tedbir, tespit davası, tazminat davası ve ceza davası süreçlerinde müvekkillerimizi temsil ediyoruz. E-ticaret platformlarında taklit ürün şikayet süreçlerinde danışmanlık veriyoruz.',
			},
			{
				heading: 'Endüstriyel Tasarım Tescili',
				text: 'Endüstriyel tasarım başvurusu, yenilik ve ayırt edicilik değerlendirmesi, tescil ve korunma sürecinde danışmanlık sağlıyoruz. Tasarım hakkının ihlali durumunda hukuki başvuru yollarını yürütüyoruz.',
			},
			{
				heading: 'Lisans ve Devir Sözleşmeleri',
				text: 'Marka, patent ve tasarım lisans sözleşmelerinin hazırlanması ve incelenmesi hizmeti veriyoruz. Fikri mülkiyet haklarının şirkete ayni sermaye olarak konulması sürecinde değerleme ve sözleşme hazırlığı konularında danışmanlık sağlıyoruz.',
			},
		],
		faq: [
			{
				q: 'Marka tescili ne kadar sürer?',
				a: 'Marka tescili süreci ortalama 6-12 ay arasında tamamlanır. Başvuru, inceleme, yayın ve itiraz aşamalarından oluşur.',
			},
			{
				q: 'Marka tescili kaç yıl geçerlidir?',
				a: 'Marka tescili 10 yıl süreyle geçerlidir ve 10 yıllık dönemler halinde süresiz olarak yenilenebilir.',
			},
			{
				q: 'Patent ile faydalı model arasındaki fark nedir?',
				a: 'Patent, buluş basamağı içeren yenilikler için 20 yıl koruma sağlarken, faydalı model daha düşük yenilik seviyesindeki buluşlar için 10 yıl koruma sağlar. Faydalı model süreci daha kısa ve düşük maliyetlidir.',
			},
			{
				q: 'E-ticaret sitesinde marka ihlali tespit edildiğinde ne yapılmalıdır?',
				a: 'Öncelikle ihtiyati tedbir talebiyle mahkemeye başvurulur. Eş zamanlı olarak platform şikayet mekanizmaları (Trendyol IPR, Amazon Brand Registry) kullanılır. Delillerin tespiti için noter tespiti yapılması önerilir.',
			},
		],
		seoTitle: 'Fikri Mülkiyet Avukatı | Marka, Patent ve Tasarım Hukuku',
		seoDescription:
			'Marka tescili, patent başvurusu, endüstriyel tasarım ve fikri mülkiyet ihlalleri alanında uzman avukat. İstanbul merkezli Balabanlı Hukuk Bürosu danışmanlık ve dava takibi.',
	},
	{
		slug: 'is-hukuku',
		title: 'İş Hukuku',
		tag: 'is-hukuku',
		description:
			'Kıdem ve ihbar tazminatı hesaplama, işe iade davaları, iş sözleşmesi feshi ve işçi-işveren uyuşmazlıklarında arabuluculuk ve dava süreci.',
		icon: 'briefcase',
		heroTitle: 'İş Hukuku',
		heroSummary:
			'Kıdem tazminatı, işe iade davaları, iş sözleşmesi feshi ve işçi-işveren uyuşmazlıklarında kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Kıdem ve İhbar Tazminatı',
				text: 'Kıdem tazminatı hesaplama, ihbar tazminatı süresi belirleme ve tazminat davalarında müvekkillerimizi temsil ediyoruz. 2026 güncel tavan tutarı ve hesaplama formülü konusunda detaylı bilgilendirme sağlıyoruz.',
			},
			{
				heading: 'İşe İade Davaları',
				text: 'Haksız fesih durumunda işe iade davası açılması ve takibi konusunda hukuki hizmet veriyoruz. İşe iade başvurusu, arabuluculuk süreci ve dava aşamasında müvekkillerimizi temsil ediyoruz.',
			},
			{
				heading: 'İş Sözleşmesi Feshi',
				text: 'İş sözleşmesinin haklı nedenle feshi, geçerli nedenle feshi ve haksız fesih durumlarında hem işçi hem de işveren tarafına danışmanlık veriyoruz. Fesih bildirimi, ihbar süresi ve feshe bağlı sonuçlar konusunda bilgilendirme sağlıyoruz.',
			},
			{
				heading: 'İşçi-İşveren Uyuşmazlıklarında Arabuluculuk',
				text: 'İş hukuku uyuşmazlıklarında zorunlu arabuluculuk sürecinde müvekkillerimizi temsil ediyoruz. Kıdem tazminatı, fazla mesai, yıllık izin ücreti gibi alacak taleplerinde arabuluculuk görüşmelerine katılıyoruz.',
			},
		],
		faq: [
			{
				q: 'Kıdem tazminatına hak kazanmak için kaç yıl çalışmak gerekir?',
				a: 'Aynı işverene bağlı olarak en az 1 yıl kesintisiz çalışma şartı aranır. Bir yıldan artan süreler oransal olarak hesaplanır.',
			},
			{
				q: 'İstifa eden işçi kıdem tazminatı alabilir mi?',
				a: 'Genel kural olarak istifa eden işçi kıdem tazminatı alamaz. Ancak işçinin haklı fesih nedenleri (ücret ödenmemesi, mobbing vb.) varsa istifa kıdem tazminatı hakkı doğurur.',
			},
			{
				q: 'İşe iade davası ne kadar sürer?',
				a: 'Arabuluculuk süreci dahil olmak üzere işe iade davası ortalama 6-12 ay içinde sonuçlanır. İşe iade kararı verilirse işçi 10 gün içinde işe başlamak için başvurmalıdır.',
			},
			{
				q: 'Fazla mesai ücreti nasıl hesaplanır?',
				a: 'Fazla mesai ücreti normal saat ücretinin yüzde 50 fazlası olarak hesaplanır. Haftalık 45 saati aşan çalışmalar fazla mesai sayılır. 2026 yılı için fazla mesai ücreti hesaplamalarında brüt ücret esas alınır.',
			},
		],
		seoTitle: 'İş Hukuku Avukatı | Kıdem Tazminatı ve İşe İade Davaları',
		seoDescription:
			'İş hukuku alanında uzman avukat. Kıdem ve ihbar tazminatı, işe iade davaları, iş sözleşmesi feshi ve işçi-işveren uyuşmazlıklarında hukuki danışmanlık. İstanbul merkezli hizmet.',
	},
	{
		slug: 'gayrimenkul',
		title: 'Gayrimenkul Hukuku',
		tag: 'gayrimenkul',
		description:
			'Tapu iptali ve tescil davaları, kira uyuşmazlıkları, tahliye talepleri ve ortaklığın giderilmesi (izale-i şüyu) süreçleri.',
		icon: 'house',
		heroTitle: 'Gayrimenkul Hukuku',
		heroSummary:
			'Tapu iptali ve tescil davaları, kira uyuşmazlıkları, tahliye talepleri ve ortaklığın giderilmesi süreçlerinde kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Tapu İptali ve Tescil Davaları',
				text: 'Tapu kaydında düzeltme, kadastro tespitine itiraz, tapu iptali ve tescil davalarında müvekkillerimizi temsil ediyoruz. Miras hukukundan kaynaklanan tapu uyuşmazlıkları ve muvazaa iddialarında hukuki süreci yürütüyoruz.',
			},
			{
				heading: 'Kira Uyuşmazlıkları',
				text: 'Konut ve ticari kira sözleşmelerinden kaynaklanan uyuşmazlıklarda danışmanlık veriyoruz. Kira artış oranı hesaplama, kira tespit davası, uyarlama davası ve kira bedelinin ödenmemesi durumunda izlenecek yollar konusunda bilgilendirme sağlıyoruz.',
			},
			{
				heading: 'Tahliye Davaları',
				text: 'İhtiyaç sebebiyle tahliye, yeniden inşa sebebiyle tahliye ve kira bedelinin ödenmemesi sebebiyle tahliye davalarında hem kiracı hem de malik tarafına hukuki danışmanlık veriyoruz. Tahliye taahhüdü ve ihtarname süreçlerinde destek sağlıyoruz.',
			},
			{
				heading: 'Ortaklığın Giderilmesi (İzale-i Şüyu)',
				text: 'Taşınmazlarda ortaklığın giderilmesi davası açılması ve takibi konusunda hukuki hizmet veriyoruz. Aynen taksim veya satış yoluyla ortaklığın giderilmesi seçenekleri arasında müvekkillerimizi bilgilendiriyoruz.',
			},
		],
		faq: [
			{
				q: 'Kira artış oranı 2026\'da nasıl hesaplanır?',
				a: 'Konut kiralarında kira artış oranı TÜFE 12 aylık ortalaması ile sınırlıdır. Ticari kiralarda ise taraflar serbestçe artış oranı belirleyebilir, ancak uyarlama davası açma hakkı saklıdır.',
			},
			{
				q: 'Tahliye taahhüdü geçerli midir?',
				a: 'Evet, tahliye taahhüdü geçerlidir. Ancak kira sözleşmesiyle birlikte değil, ayrı bir belge olarak ve kira ilişkisinin başlangıcından itibaren belirli bir süre sonra düzenlenmelidir.',
			},
			{
				q: 'Ortaklığın giderilmesi davası ne kadar sürer?',
				a: 'Taşınmazın durumuna göre değişmekle birlikte ortalama 1-2 yıl içinde sonuçlanır. Mahkeme öncelikle aynen taksim mümkün mü diye değerlendirir, mümkün değilse satışa karar verir.',
			},
			{
				q: 'Kiracı kira bedelini ödemezse ne yapılabilir?',
				a: 'Öncelikle ihtarname gönderilir ve süre verilir. Ödeme yapılmazsa icra takibi başlatılabilir veya tahliye davası açılabilir. Kira uyuşmazlıklarında arabuluculuk dava şartıdır.',
			},
		],
		seoTitle: 'Gayrimenkul Hukuku Avukatı | Kira ve Tapu Davaları',
		seoDescription:
			'Tapu iptali, kira uyuşmazlıkları, tahliye davaları ve ortaklığın giderilmesinde uzman gayrimenkul avukatı. İstanbul merkezli Balabanlı Hukuk Bürosu danışmanlık hizmeti.',
	},
	{
		slug: 'ticaret-hukuku',
		title: 'Ticaret Hukuku',
		tag: 'ticaret-hukuku',
		description:
			'Ticari sözleşmeler, ticari işlere ilişkin uyuşmazlıklar, haksız rekabet ve ticari ihtarname süreçlerinde danışmanlık.',
		icon: 'scale',
		heroTitle: 'Ticaret Hukuku',
		heroSummary:
			'Ticari sözleşmeler, haksız rekabet, ticari iş uyuşmazlıkları ve ihtarname süreçlerinde kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'Ticari Sözleşmeler',
				text: 'Ticari işletmeler arasındaki sözleşmelerin hazırlanması, incelenmesi ve müzakere sürecinde danışmanlık veriyoruz. Satış, dağıtım, bayilik, acentelik ve tedarik sözleşmeleri başta olmak üzere tüm ticari sözleşme türlerinde hukuki destek sağlıyoruz.',
			},
			{
				heading: 'Haksız Rekabet',
				text: 'TTK kapsamında haksız rekabet hallerinin tespiti, tespit davası, men davası ve haksız rekabetten kaynaklanan tazminat davalarında müvekkillerimizi temsil ediyoruz. Rekabet yasağı sözleşmelerinin hazırlanması ve uygulanması konusunda danışmanlık veriyoruz.',
			},
			{
				heading: 'Ticari İhtarname ve Protesto',
				text: 'Ticari işlerde ihtarname çekilmesi, protesto düzenlenmesi ve bu belgelerin hukuki sonuçları konusunda danışmanlık sağlıyoruz. Muhtıra ile protesto arasındaki farklar ve her birinin ticari hayattaki işlevi hakkında bilgilendirme yapıyoruz.',
			},
			{
				heading: 'Ticari Dava Takibi',
				text: 'Asliye ticaret mahkemelerinde görülen ticari davalarda müvekkillerimizi temsil ediyoruz. Ticari defter delili, ticari faiz hesaplaması ve ticari iş karinesi konularında hukuki danışmanlık sağlıyoruz.',
			},
		],
		faq: [
			{
				q: 'Ticari iş ile adi iş arasındaki fark nedir?',
				a: 'Ticari iş, TTK kapsamında düzenlenen işler ile ticari işletmeyi ilgilendiren tüm işlemlerdir. Ticari işlerde daha kısa zamanaşımı süreleri ve daha yüksek faiz oranları uygulanır.',
			},
			{
				q: 'Haksız rekabet durumunda hangi davalar açılabilir?',
				a: 'Fiilin tespiti davası, haksız rekabetin men\'i davası, hukuka aykırı durumun ortadan kaldırılması davası ve maddi-manevi tazminat davası açılabilir. İhtiyati tedbir talebi de mümkündür.',
			},
			{
				q: 'Ticari ihtarname ile protesto arasındaki fark nedir?',
				a: 'İhtarname, borçluya ödeme veya ifa çağrısı yapan bir bildirimdir. Protesto ise çek, bono gibi kambiyo senetlerinde ödememe durumunu resmileştiren ve daha ağır hukuki sonuçlar doğuran bir işlemdir.',
			},
			{
				q: 'Ticari davalarda arabuluculuk zorunlu mudur?',
				a: 'Evet, 2023 yılı itibarıyla ticari davalardan doğan alacak ve tazminat talepleri için arabuluculuk dava şartı haline getirilmiştir. Arabuluculuk son tutanağı olmadan dava açılamaz.',
			},
		],
		seoTitle: 'Ticaret Hukuku Avukatı | Ticari Sözleşme ve Dava Danışmanlığı',
		seoDescription:
			'Ticari sözleşmeler, haksız rekabet, ticari ihtarname ve ticari dava takibi alanlarında uzman ticaret hukuku avukatı. İstanbul merkezli hukuki danışmanlık hizmeti.',
	},
	{
		slug: 'icra-tahsilat',
		title: 'İcra ve Tahsilat',
		tag: 'icra-tahsilat',
		description:
			'İcra takibi başlatma ve takip, ödenmemiş fatura ve senet tahsilatı, haciz işlemleri ve icra ceza davaları.',
		icon: 'coin',
		heroTitle: 'İcra ve Tahsilat Hukuku',
		heroSummary:
			'İcra takibi başlatma, alacak tahsilatı, haciz işlemleri ve icra ceza davalarında kapsamlı hukuki danışmanlık ve takip hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'İcra Takibi Başlatma',
				text: 'Alacaklı adına icra takibi başlatılması, ödeme emri gönderilmesi ve takibin kesinleşmesi sürecinde danışmanlık veriyoruz. İlamsız icra, ilamlı icra ve kambiyo senetlerine mahsus icra takibi türleri arasında en uygun yolun belirlenmesi konusunda bilgilendirme sağlıyoruz.',
			},
			{
				heading: 'Haciz ve Satış',
				text: 'Kesinleşen icra takibinde haciz talebi, haciz işlemlerinin takibi ve haczedilen malların satışı sürecinde danışmanlık sağlıyoruz. Menkul ve gayrimenkul haczi, üçüncü kişilerdeki alacakların haczi ve maaş haczi konularında hukuki destek veriyoruz.',
			},
			{
				heading: 'İtirazın İptali ve Menfi Tespit',
				text: 'Borçlunun icra takibine itirazı halinde itirazın kaldırılması veya itirazın iptali davası açılması konusunda danışmanlık veriyoruz. Menfi tespit davası ve istirdat davası süreçlerinde müvekkillerimizi temsil ediyoruz.',
			},
			{
				heading: 'İcra Ceza Davaları',
				text: 'Karşılıksız çek, malvarlığını gizleme ve taksirli iflas gibi icra ceza davalarında müvekkillerimizi temsil ediyoruz. Borçlunun malvarlığını kaçırma girişimlerine karşı şikayet ve dava sürecini yürütüyoruz.',
			},
		],
		faq: [
			{
				q: 'İcra takibi ne kadar sürer?',
				a: 'Ödeme emrinin borçluya tebliği ile başlayan süreçte, borçlu 7 gün içinde ödeme yapmaz veya itiraz etmezse takip kesinleşir. Haciz aşaması borçlunun malvarlığı durumuna göre değişir.',
			},
			{
				q: 'İcra takibinde zamanaşımı süresi nedir?',
				a: 'İlamsız icra takibinde zamanaşımı süresi alacağın türüne göre değişir. Genel olarak 10 yıllık zamanaşımı süresi uygulanır, ancak kambiyo senetlerinde bu süre 3 yıldır.',
			},
			{
				q: 'Ödenmemiş fatura için hangi yasal yollar izlenebilir?',
				a: 'Öncelikle ihtarname çekilir, ödeme yapılmazsa arabuluculuk başvurusu yapılır, sonuç alınamazsa icra takibi başlatılır veya alacak davası açılır.',
			},
			{
				q: 'Borçlu malvarlığını gizlerse ne yapılabilir?',
				a: 'Borçlunun malvarlığını gizlemesi veya kaçırması durumunda icra ceza mahkemesine şikayette bulunulabilir. Ayrıca tasarrufun iptali davası ile malvarlığının iadesi talep edilebilir.',
			},
		],
		seoTitle: 'İcra ve Tahsilat Avukatı | İcra Takibi ve Alacak Tahsilatı',
		seoDescription:
			'İcra takibi, alacak tahsilatı, haciz işlemleri ve icra ceza davalarında uzman avukat. İstanbul merkezli Balabanlı Hukuk Bürosu icra ve tahsilat hukuku hizmeti sunar.',
	},
	{
		slug: 'espor',
		title: 'E-Spor Hukuku Avukatı',
		tag: 'espor',
		description:
			'E-spor avukatı desteğiyle oyuncu sözleşmeleri, takım anlaşmaları, sponsorluk, transfer, yayın hakları ve turnuva ödül uyuşmazlıklarında hukuki danışmanlık.',
		icon: 'gamepad',
		heroTitle: 'E-Spor Hukuku Avukatı',
		heroSummary:
			'E-spor oyuncuları, takımlar, ajanslar ve sponsorlar için espor sözleşmesi, transfer, buyout, sponsorluk, yayın hakları ve turnuva ödül paylaşımı konularında hukuki danışmanlık sunuyoruz.',
		sections: [
			{
				heading: 'E-Spor Oyuncu ve Takım Sözleşmeleri',
				text: 'Profesyonel e-spor oyuncuları, koçlar, yayıncılar ve takımlar arasındaki sözleşmelerin hazırlanması ve incelenmesi hizmeti veriyoruz. Maaş, ikramiye, ödül paylaşımı, gizlilik, yayın hakları, rekabet yasağı, davranış kuralları ve fesih koşulları gibi kritik maddelerin açık düzenlenmesini sağlıyoruz.',
			},
			{
				heading: 'Transfer ve Buyout Süreçleri',
				text: 'E-spor transfer sözleşmesi, buyout bedeli, sözleşme feshi, lisans işlemleri, roster değişiklikleri ve kulüpler arası anlaşma süreçlerinde hukuki danışmanlık sağlıyoruz. Transfer dönemlerinde oyuncu ve takım haklarının korunmasına yönelik strateji oluşturuyoruz.',
			},
			{
				heading: 'E-Spor Sponsorluk Sözleşmeleri',
				text: 'E-spor takımları, oyuncuları, yayıncıları ve içerik üreticileri için sponsorluk sözleşmelerinin hazırlanması ve müzakeresi sürecinde danışmanlık veriyoruz. Marka kullanımı, görünürlük yükümlülükleri, performans kriterleri, ödeme koşulları, münhasırlık ve fesih hakları dengeli şekilde düzenlenmelidir.',
			},
			{
				heading: 'Yayın, İçerik ve Fikri Mülkiyet Hakları',
				text: 'Twitch, YouTube, Kick ve benzeri platformlardaki yayın gelirleri, içerik kullanım izinleri, oyuncu rumuzu, takım logosu, marka iş birlikleri ve dijital varlıklar için sözleşme dili oluşturuyoruz. Yayın haklarının kime ait olduğu baştan belirlenmelidir.',
			},
			{
				heading: 'Turnuva Ödül Dağıtımı',
				text: 'E-spor turnuvalarında kazanılan ikramiye ve ödüllerin dağıtımında oyuncu, takım ve organizatör arasındaki hukuki ilişkinin düzenlenmesi konusunda danışmanlık veriyoruz. Ödül paylaşım oranları, vergi kesintileri, ödeme takvimi ve ödemenin kime yapılacağı sözleşmeye bağlanmalıdır.',
			},
			{
				heading: 'İş Sözleşmesi-Hizmet Sözleşmesi Ayrımı',
				text: 'E-spor oyuncusunun kulüple arasındaki ilişkinin iş sözleşmesi mi yoksa hizmet sözleşmesi mi olduğu konusunda danışmanlık veriyoruz. Bu ayrım, tazminat, sigorta, vergi ve sosyal haklar açısından kritik öneme sahiptir.',
			},
		],
		faq: [
			{
				q: 'E-spor oyuncu sözleşmesinde hangi maddeler bulunmalıdır?',
				a: 'Süre, ücret, ödül paylaşımı, gizlilik, yayıncılık hakları, fesih koşulları, rekabet yasağı ve uyuşmazlık çözüm maddeleri bulunmalıdır. Her maddenin açık ve anlaşılır şekilde düzenlenmesi önemlidir.',
			},
			{
				q: 'E-spor avukatı hangi konularda destek verir?',
				a: 'E-spor avukatı oyuncu sözleşmeleri, takım anlaşmaları, sponsorluk, transfer, buyout, yayın hakları, ödül paylaşımı, fesih ve uyuşmazlık çözümü konularında hukuki destek verir.',
			},
			{
				q: 'E-spor oyuncusu işçi midir?',
				a: 'Bu konuda kesin bir yargıtay içtihadı bulunmamakla birlikte, oyuncunun kulübe bağımlı çalışması ve talimat alma durumu iş sözleşmesine işaret eder. Bağımsız turnuva oyuncuları genellikle hizmet sözleşmesi kapsamındadır.',
			},
			{
				q: 'Turnuva ödülü kulüp ile oyuncu arasında nasıl paylaşılmalıdır?',
				a: 'Ödül paylaşım oranı sözleşmede açıkça belirtilmelidir. Genellikle yüzde 70-80 oyuncu, yüzde 20-30 kulüp şeklinde düzenleme yapılır. Organizatörün ödemeyi kime yapacağı da sözleşmede belirtilmelidir.',
			},
			{
				q: 'E-spor transferinde buyout bedeli nedir?',
				a: 'Buyout bedeli, bir oyuncunun sözleşmesinin başka bir kulübe devri için ödenmesi gereken bedeldir. Sözleşmede buyout bedeli açıkça belirtilmemişse, taraflar serbestçe pazarlık yapar.',
			},
		],
		seoTitle: 'E-Spor Avukatı | Espor Sözleşmesi ve Sponsorluk',
		seoDescription:
			'E-spor avukatı desteğiyle espor sözleşmesi, oyuncu ve takım anlaşmaları, sponsorluk, transfer, buyout ve yayın haklarında hukuki danışmanlık.',
	},
];

export const serviceAreasEn: ServiceArea[] = [
	{
		slug: 'aile-hukuku',
		title: 'Family Law',
		tag: 'family-law',
		description:
			'Private family matters, divorce planning, custody arrangements, support issues, and settlement strategy for individuals with cross-border or Turkey-based concerns.',
		icon: 'family',
		heroTitle: 'Family Law',
		heroSummary:
			'We advise individuals on divorce, custody, support, marital property, and family settlement strategy with a measured, confidential approach.',
		sections: [
			{
				heading: 'Divorce Planning',
				text: 'We help clients prepare for contested or settlement-focused divorce proceedings by reviewing documents, identifying procedural risks, and clarifying the issues that should be resolved before filing or negotiation.',
			},
			{
				heading: 'Custody and Parenting Arrangements',
				text: 'We advise on custody, visitation, relocation concerns, and practical parenting arrangements while keeping the child-focused legal framework at the center of the strategy.',
			},
			{
				heading: 'Support and Property Issues',
				text: 'We assist with support claims, marital property questions, and settlement terms so that financial obligations and asset division are addressed clearly and documented properly.',
			},
			{
				heading: 'Family Settlement Support',
				text: 'Where settlement is realistic, we help structure negotiation points, review protocols, and reduce avoidable disputes before court filings or hearings become necessary.',
			},
		],
		faq: [
			{
				q: 'Can a divorce matter in Turkey be handled through settlement?',
				a: 'Yes. If the parties can agree on divorce and its consequences, a settlement-oriented process may be possible. The required documents and hearing expectations depend on the facts of the case.',
			},
			{
				q: 'What information is useful before a first family law consultation?',
				a: 'Marriage documents, children-related details, current living arrangements, asset information, prior agreements, and any urgent safety or relocation concerns are useful starting points.',
			},
			{
				q: 'Can custody and support terms be changed later?',
				a: 'They may be reviewed when circumstances materially change. The court will examine the legal basis, the child-related interests, and the evidence supporting the requested change.',
			},
		],
		seoTitle: 'Family Law Attorney in Istanbul | Divorce and Custody',
		seoDescription:
			'Family law advice in Istanbul for divorce, custody, support, property issues, and settlement planning. Confidential legal guidance for individuals.',
	},
	{
		slug: 'miras-hukuku',
		title: 'Inheritance Law',
		tag: 'inheritance-law',
		description:
			'Inheritance certificates, estate planning questions, wills, reserved share disputes, asset transfers, and inheritance-related litigation in Turkey.',
		icon: 'scroll',
		heroTitle: 'Inheritance Law',
		heroSummary:
			'We advise heirs, families, and beneficiaries on Turkish inheritance procedures, estate documents, will validity, reserved share claims, and inheritance disputes.',
		sections: [
			{
				heading: 'Inheritance Certificates',
				text: 'We guide clients through obtaining and using inheritance certificates, identifying heirs, and understanding the practical steps needed before estate assets can be transferred or managed.',
			},
			{
				heading: 'Wills and Estate Documents',
				text: 'We review will formalities, document validity, estate planning choices, and the legal risks that can arise when testamentary wishes are not properly documented.',
			},
			{
				heading: 'Reserved Share and Reduction Claims',
				text: 'We advise heirs on reserved share protections, reduction actions, and evidence needed when lifetime transfers or testamentary dispositions affect statutory inheritance rights.',
			},
			{
				heading: 'Estate and Property Disputes',
				text: 'We represent clients in disputes involving estate property, alleged sham transfers, co-owned assets, and practical resolution of inheritance-related property conflicts.',
			},
		],
		faq: [
			{
				q: 'What is an inheritance certificate used for?',
				a: 'It identifies the legal heirs and their shares. It is usually needed before heirs can complete asset transfer, registry, banking, or estate administration steps.',
			},
			{
				q: 'Can a will be challenged in Turkey?',
				a: 'Yes. A will may be challenged for formal defects, capacity issues, undue influence, or conflicts with mandatory inheritance protections, depending on the circumstances.',
			},
			{
				q: 'What should foreign heirs prepare for a Turkish estate matter?',
				a: 'Identity documents, death records, family registry or civil status documents, property information, and any will or transfer records are commonly relevant.',
			},
		],
		seoTitle: 'Inheritance Law in Turkey | Estate and Will Disputes',
		seoDescription:
			'Inheritance law advice in Turkey for heirs, wills, inheritance certificates, reserved share claims, estate assets, and inheritance disputes.',
	},
	{
		slug: 'sirketler-hukuku',
		title: 'Corporate Law',
		tag: 'corporate-law',
		relatedTags: ['business-law', 'compliance', 'risk-management'],
		description:
			'Company formation, shareholder arrangements, governance documents, share transfers, board decisions, and ongoing legal support for businesses.',
		icon: 'building',
		heroTitle: 'Corporate Law',
		heroSummary:
			'We support founders, shareholders, and companies with Turkish corporate structuring, governance, documentation, and transaction-related legal needs.',
		sections: [
			{
				heading: 'Company Formation and Structuring',
				text: 'We advise on limited and joint-stock company setup, articles of association, registry steps, capital requirements, signing authority, and post-incorporation legal obligations.',
			},
			{
				heading: 'Shareholder and Founder Agreements',
				text: 'We prepare and review agreements that address decision-making, reserved matters, exit rights, deadlock mechanisms, confidentiality, and dispute resolution between founders or shareholders.',
			},
			{
				heading: 'Governance and Board Decisions',
				text: 'We assist with board and general assembly documentation, authority changes, manager appointments, internal approvals, and governance records needed for compliant operations.',
			},
			{
				heading: 'Share Transfers and Corporate Changes',
				text: 'We support share transfers, capital changes, company amendments, restructurings, and registry filings with attention to documentation and timing requirements.',
			},
		],
		faq: [
			{
				q: 'Which company type is usually preferred in Turkey?',
				a: 'Limited liability companies and joint-stock companies are common. The choice depends on ownership plans, investment expectations, governance needs, and transfer flexibility.',
			},
			{
				q: 'Why use a shareholders agreement if the articles already exist?',
				a: 'Articles are public and formal. A shareholders agreement can address commercial arrangements, exit rules, confidentiality, and deadlock solutions in more detail.',
			},
			{
				q: 'Can corporate changes be handled after incorporation?',
				a: 'Yes. Manager changes, address changes, capital changes, share transfers, and articles amendments can generally be handled through the required approvals and registry filings.',
			},
		],
		seoTitle: 'Corporate Lawyer in Istanbul | Company and Shareholder Law',
		seoDescription:
			'Corporate law services in Istanbul for company formation, shareholder agreements, governance, share transfers, board decisions, and business legal support.',
	},
	{
		slug: 'fikri-mulkiyet',
		title: 'Intellectual Property',
		tag: 'intellectual-property',
		relatedTags: ['ip-law'],
		description:
			'Trademark, patent, design, licensing, enforcement, marketplace infringement, and IP commercialization support for businesses and creators.',
		icon: 'bulb',
		heroTitle: 'Intellectual Property Law',
		heroSummary:
			'We help clients protect, commercialize, and enforce trademarks, patents, designs, and other intellectual property rights in Turkey.',
		sections: [
			{
				heading: 'Trademark Strategy',
				text: 'We advise on trademark clearance, application strategy, Nice classes, office actions, oppositions, renewals, portfolio management, and brand protection planning.',
			},
			{
				heading: 'Patents and Designs',
				text: 'We support patent, utility model, and industrial design matters, including application planning, ownership questions, documentation review, and enforcement options.',
			},
			{
				heading: 'IP Enforcement',
				text: 'We assist with infringement analysis, cease-and-desist strategy, preliminary injunctions, evidence preservation, litigation, and platform complaints for online infringement.',
			},
			{
				heading: 'Licensing and Commercial Use',
				text: 'We prepare and review license, assignment, coexistence, sponsorship, and technology-related agreements where IP rights are central to the commercial relationship.',
			},
		],
		faq: [
			{
				q: 'How long does trademark registration take in Turkey?',
				a: 'Timing varies depending on examination and opposition issues, but trademark registration commonly takes several months when no major objection or opposition arises.',
			},
			{
				q: 'What should be done when online trademark infringement is found?',
				a: 'Evidence should be preserved first. Depending on urgency, platform complaints, cease-and-desist letters, injunction requests, or litigation may be considered.',
			},
			{
				q: 'Can IP rights be licensed or transferred?',
				a: 'Yes. Trademarks, patents, designs, and certain other rights can be licensed or assigned if the agreement clearly defines scope, territory, duration, payment, and registry steps where needed.',
			},
		],
		seoTitle: 'Intellectual Property Lawyer in Turkey | Trademark and IP',
		seoDescription:
			'IP law services in Turkey for trademarks, patents, industrial designs, licensing, enforcement, marketplace infringement, and brand protection.',
	},
	{
		slug: 'is-hukuku',
		title: 'Employment Law',
		tag: 'employment-law',
		relatedTags: ['labor-law'],
		description:
			'Employment contracts, termination strategy, workplace disputes, severance questions, employer compliance, and employee-side claims.',
		icon: 'briefcase',
		heroTitle: 'Employment Law',
		heroSummary:
			'We advise employers and employees on Turkish employment contracts, termination, compensation, workplace disputes, and dispute resolution steps.',
		sections: [
			{
				heading: 'Employment Contracts',
				text: 'We prepare and review employment contracts, remote work terms, confidentiality clauses, non-compete provisions, compensation structures, and policy documents.',
			},
			{
				heading: 'Termination and Severance',
				text: 'We advise on termination grounds, notice requirements, severance exposure, settlement documentation, and evidence needed to reduce dispute risk.',
			},
			{
				heading: 'Workplace Disputes',
				text: 'We assist with reinstatement claims, unpaid salary, overtime, annual leave, workplace conduct issues, and mediation or litigation strategy.',
			},
			{
				heading: 'Employer Compliance',
				text: 'We support businesses with workplace documentation, internal policies, employment risk reviews, and practical steps for compliant HR operations.',
			},
		],
		faq: [
			{
				q: 'Is mediation required for employment disputes in Turkey?',
				a: 'Many employment disputes require mandatory mediation before filing a lawsuit. The exact path depends on the claim type and procedural posture.',
			},
			{
				q: 'What documents matter in a termination dispute?',
				a: 'The employment contract, payroll records, notices, written warnings, correspondence, attendance records, and settlement documents are often important.',
			},
			{
				q: 'Can employers use non-compete clauses?',
				a: 'Non-compete clauses may be possible, but enforceability depends on scope, duration, geography, role, and whether the restriction is reasonable under Turkish law.',
			},
		],
		seoTitle: 'Employment Lawyer in Istanbul | Contracts and Termination',
		seoDescription:
			'Employment law advice in Istanbul for contracts, termination, severance, workplace disputes, mediation, employee claims, and employer compliance.',
	},
	{
		slug: 'gayrimenkul',
		title: 'Real Estate Law',
		tag: 'real-estate',
		description:
			'Property transactions, title deed disputes, lease issues, eviction strategy, co-ownership disputes, and real estate due diligence in Turkey.',
		icon: 'house',
		heroTitle: 'Real Estate Law',
		heroSummary:
			'We advise individuals and businesses on Turkish real estate transactions, leases, title issues, eviction matters, and property disputes.',
		sections: [
			{
				heading: 'Property Due Diligence',
				text: 'We review title records, encumbrances, zoning indicators, contractual documents, payment structure, and practical legal risks before a real estate transaction.',
			},
			{
				heading: 'Lease and Eviction Matters',
				text: 'We advise landlords and tenants on residential and commercial leases, rent disputes, eviction notices, payment defaults, and settlement options.',
			},
			{
				heading: 'Title Deed Disputes',
				text: 'We handle title correction, cancellation and registration claims, inheritance-related property issues, and disputes involving alleged invalid or sham transfers.',
			},
			{
				heading: 'Co-Ownership Disputes',
				text: 'We assist with co-owned property conflicts, partition by sale, settlement between co-owners, and litigation steps when voluntary division is not possible.',
			},
		],
		faq: [
			{
				q: 'What should be checked before buying property in Turkey?',
				a: 'Title records, encumbrances, zoning or usage limits, seller authority, payment terms, tax implications, and transaction documents should be reviewed before closing.',
			},
			{
				q: 'Can a landlord evict a tenant immediately for non-payment?',
				a: 'No. The proper notice, enforcement, mediation, or court route depends on the lease, payment history, and legal grounds for eviction.',
			},
			{
				q: 'How are co-owned properties resolved when owners disagree?',
				a: 'Owners may settle voluntarily, but if agreement is not possible, a partition process may be used to divide or sell the property under court supervision.',
			},
		],
		seoTitle: 'Real Estate Lawyer in Turkey | Property and Lease Disputes',
		seoDescription:
			'Real estate law services in Turkey for property due diligence, title deed disputes, leases, eviction, co-ownership, and property litigation.',
	},
	{
		slug: 'ticaret-hukuku',
		title: 'Commercial Law',
		tag: 'commercial-law',
		relatedTags: ['contracts', 'business-law', 'risk-management', 'litigation', 'evidence', 'civil-law'],
		description:
			'Commercial contracts, debt and payment disputes, unfair competition, notices, settlement strategy, and litigation planning for business relationships.',
		icon: 'scale',
		heroTitle: 'Commercial Law',
		heroSummary:
			'We advise businesses on commercial contracts, payment disputes, negotiation strategy, unfair competition, notices, and litigation risk management.',
		sections: [
			{
				heading: 'Commercial Contracts',
				text: 'We draft and review sales, supply, distribution, service, agency, confidentiality, and cooperation agreements with attention to enforceability and operational clarity.',
			},
			{
				heading: 'Payment and Performance Disputes',
				text: 'We assist with unpaid invoices, breach of contract, delayed performance, defective delivery, evidence planning, notices, settlement, mediation, and litigation strategy.',
			},
			{
				heading: 'Unfair Competition and Business Torts',
				text: 'We advise on unfair competition, misleading commercial conduct, misuse of confidential information, non-solicitation issues, and related court or injunction options.',
			},
			{
				heading: 'Pre-Litigation Strategy',
				text: 'We help businesses organize evidence, define leverage, choose between negotiation and enforcement routes, and reduce procedural risk before a claim is filed.',
			},
		],
		faq: [
			{
				q: 'Should a commercial dispute start with a legal notice?',
				a: 'Often yes, but the decision depends on urgency, contract terms, evidence, payment status, and whether a notice could improve or weaken leverage.',
			},
			{
				q: 'What makes a commercial contract easier to enforce?',
				a: 'Clear parties, scope, price, payment terms, delivery rules, default consequences, evidence provisions, governing law, and dispute resolution terms reduce uncertainty.',
			},
			{
				q: 'Is mediation required for commercial disputes?',
				a: 'Many commercial monetary claims require mediation before litigation. The exact requirement depends on the claim and procedural context.',
			},
		],
		seoTitle: 'Commercial Lawyer in Istanbul | Contracts and Disputes',
		seoDescription:
			'Commercial law services in Istanbul for contracts, unpaid invoices, breach disputes, unfair competition, notices, mediation, and litigation planning.',
	},
	{
		slug: 'icra-tahsilat',
		title: 'Debt Collection and Enforcement',
		tag: 'debt-collection',
		relatedTags: ['enforcement', 'litigation', 'evidence', 'civil-law'],
		description:
			'Unpaid invoices, enforcement proceedings, payment orders, debtor objections, settlement strategy, and collection litigation in Turkey.',
		icon: 'coin',
		heroTitle: 'Debt Collection and Enforcement',
		heroSummary:
			'We help creditors and businesses evaluate collection options, prepare enforcement files, respond to objections, and pursue unpaid receivables in Turkey.',
		sections: [
			{
				heading: 'Collection Strategy',
				text: 'We assess the claim, debtor profile, evidence, limitation risks, settlement prospects, and the most practical route before starting formal collection steps.',
			},
			{
				heading: 'Enforcement Proceedings',
				text: 'We assist with payment orders, enforcement filings, attachment steps, debtor objections, and follow-up actions required to move collection forward.',
			},
			{
				heading: 'Invoice and Contract Claims',
				text: 'We support unpaid invoice, promissory note, contract balance, service fee, and commercial receivable matters with documentation and procedural planning.',
			},
			{
				heading: 'Disputed Debt Litigation',
				text: 'When a debtor objects or disputes liability, we advise on objection cancellation, declaratory claims, settlement, and evidence needed for court proceedings.',
			},
		],
		faq: [
			{
				q: 'What documents are needed for debt collection?',
				a: 'Invoices, contracts, delivery records, account statements, correspondence, payment reminders, and debtor details are typically useful.',
			},
			{
				q: 'What happens if the debtor objects to enforcement?',
				a: 'The enforcement process may pause, and the creditor may need to pursue the appropriate court route to challenge the objection or prove the debt.',
			},
			{
				q: 'Can collection matters be settled?',
				a: 'Yes. Settlement is often practical if payment timing, installments, security, interest, and default consequences are documented clearly.',
			},
		],
		seoTitle: 'Debt Collection Lawyer in Turkey | Enforcement Proceedings',
		seoDescription:
			'Debt collection and enforcement services in Turkey for unpaid invoices, payment orders, debtor objections, receivables, and collection litigation.',
	},
	{
		slug: 'espor',
		title: 'Esports Lawyer in Turkey',
		tag: 'esports-law',
		relatedTags: ['esports-contracts', 'gaming-law', 'streamer-contracts', 'sponsorships'],
		description:
			'Esports lawyer in Turkey for player contracts, team agreements, sponsorship deals, transfers, prize money, streaming rights, and gaming industry legal support.',
		icon: 'gamepad',
		heroTitle: 'Esports Lawyer in Turkey',
		heroSummary:
			'We advise esports players, teams, agencies, streamers, sponsors, and gaming businesses on contracts, transfers, buyouts, sponsorships, prize allocation, and digital rights in Turkey.',
		sections: [
			{
				heading: 'Esports Player and Team Contracts',
				text: 'We prepare and review esports player contracts, coach agreements, creator contracts, and team agreements covering compensation, bonuses, prize shares, conduct rules, confidentiality, exclusivity, termination, and dispute resolution.',
			},
			{
				heading: 'Transfers, Buyouts and Roster Changes',
				text: 'We advise on transfer clauses, buyout terms, contract termination, roster changes, federation or league rules, and documentation between clubs, teams, players, and agents.',
			},
			{
				heading: 'Esports Sponsorship and Brand Deals',
				text: 'We structure esports sponsorship agreements, influencer deals, streaming contracts, and brand partnerships with clear deliverables, usage rights, payment triggers, exclusivity, content approval, and termination rights.',
			},
			{
				heading: 'Streamer, Content and Gaming Contracts',
				text: 'We advise streamers, creators, gaming studios, agencies, and talent managers on platform revenue, content rights, channel obligations, IP ownership, image rights, sponsorship restrictions, and digital asset use.',
			},
			{
				heading: 'Prize Money and Digital Rights',
				text: 'We help teams and players document prize distribution, tax or deduction language, content rights, streaming obligations, platform revenue, and ownership of digital assets or media outputs.',
			},
		],
		faq: [
			{
				q: 'What does an esports lawyer in Turkey do?',
				a: 'An esports lawyer in Turkey helps with player contracts, team agreements, sponsorships, transfers, buyouts, streaming rights, prize money, IP rights, termination, and dispute planning.',
			},
			{
				q: 'What should be included in an esports player contract?',
				a: 'Role, term, compensation, bonus and prize sharing, streaming obligations, sponsor duties, confidentiality, conduct rules, termination, and dispute resolution should be clear.',
			},
			{
				q: 'Are esports players employees or independent contractors?',
				a: 'The answer depends on control, working conditions, payment structure, exclusivity, and the real relationship between player and organization.',
			},
			{
				q: 'How should prize money be distributed?',
				a: 'Prize allocation should be written in advance, including percentages, payment deadlines, taxes or deductions, and who receives payment from the organizer.',
			},
		],
		seoTitle: 'Esports Lawyer Turkey | Gaming and Contract Lawyer',
		seoDescription:
			'Esports lawyer in Turkey for player contracts, team agreements, sponsorships, transfers, streamer contracts, gaming deals, prize money, and IP rights.',
	},
	{
		slug: 'immigration-lawyer-turkey',
		title: 'Immigration Lawyer in Turkey',
		tag: 'immigration-law',
		relatedTags: ['residence-permit', 'deportation', 'work-permit', 'foreigners-law'],
		description:
			'Residence permits, rejected applications, deportation orders, entry bans, work permits, and legal status issues for foreigners in Turkey.',
		icon: 'globe',
		heroTitle: 'Immigration Lawyer in Turkey for Foreigners',
		heroSummary:
			'We advise foreign nationals on Turkish residence permits, rejected applications, deportation risk, entry bans, work permits, and practical legal status planning.',
		sections: [
			{
				heading: 'Residence Permit Applications',
				text: 'We help foreigners prepare residence permit files, review document gaps, assess address and financial sufficiency issues, and understand the practical risks before submitting or renewing an application.',
			},
			{
				heading: 'Rejected Residence Permits',
				text: 'When a residence permit is rejected, timing and the reasoned decision matter. We review the administrative decision, deadline, available remedies, and evidence needed for an objection or court route.',
			},
			{
				heading: 'Deportation and Entry Ban Issues',
				text: 'We advise on deportation decisions, removal-center concerns, entry bans, overstay consequences, and urgent procedural steps where a foreigner needs to protect legal position in Turkey.',
			},
			{
				heading: 'Work Permit Coordination',
				text: 'We support foreigners and employers with work permit planning, employer-side documentation, residence status coordination, and legal risk review before employment starts.',
			},
		],
		faq: [
			{
				q: 'Can a foreigner appeal a residence permit rejection in Turkey?',
				a: 'Yes, legal remedies may be available, but the correct route and deadline depend on the rejection decision, the permit type, and the facts of the file.',
			},
			{
				q: 'What should I prepare before a residence permit consultation?',
				a: 'Passport pages, visa or entry records, residence permit documents, rejection notices, address records, health insurance, financial documents, and prior applications are useful.',
			},
			{
				q: 'Can a work permit replace a residence permit?',
				a: 'A valid work permit can provide residence-related status, but timing, employer filing, and cancellation risks should be reviewed before relying on it.',
			},
		],
		seoTitle: 'Immigration Lawyer in Turkey | Residence and Deportation',
		seoDescription:
			'Immigration lawyer in Turkey for residence permits, rejected applications, deportation orders, entry bans, work permits, and foreigners law.',
	},
	{
		slug: 'real-estate-lawyer-turkey-foreigners',
		title: 'Real Estate Lawyer in Turkey for Foreigners',
		tag: 'real-estate-foreigners',
		relatedTags: ['real-estate', 'property-law', 'foreign-buyers'],
		description:
			'Property purchase due diligence, title deed checks, power of attorney review, payment risk, and transaction support for foreign buyers in Turkey.',
		icon: 'house',
		heroTitle: 'Real Estate Lawyer in Turkey for Foreign Buyers',
		heroSummary:
			'We advise foreign buyers on Turkish property transactions, title deed due diligence, encumbrance checks, payment structure, power of attorney, and closing risk.',
		sections: [
			{
				heading: 'Title Deed Due Diligence',
				text: 'We review title deed records, mortgages, liens, annotations, zoning indicators, seller authority, and transaction documents before a foreign buyer commits funds.',
			},
			{
				heading: 'Purchase Contract Review',
				text: 'We review reservation forms, preliminary sale contracts, payment schedules, penalty clauses, delivery promises, handover terms, and refund language before signature.',
			},
			{
				heading: 'Power of Attorney for Buyers',
				text: 'When a foreign buyer cannot attend in person, we review power of attorney wording so the authority is specific enough for the transaction and not broader than necessary.',
			},
			{
				heading: 'Disputes After Purchase',
				text: 'We advise on delayed delivery, title transfer problems, hidden encumbrances, defective property, seller disputes, and settlement or litigation options after a purchase.',
			},
		],
		faq: [
			{
				q: 'Can foreigners buy property in Turkey without a residence permit?',
				a: 'Yes, a residence permit is not generally required only to acquire real estate, but eligibility, location limits, title records, and transaction documents should still be checked.',
			},
			{
				q: 'What is the most important legal check before buying property?',
				a: 'The title deed and land registry records should be checked for ownership, encumbrances, annotations, mortgages, liens, and restrictions that may affect transfer or use.',
			},
			{
				q: 'Should a foreign buyer sign a power of attorney?',
				a: 'A power of attorney can be useful, but it should be carefully limited to the required transaction steps and reviewed before notarization or consular execution.',
			},
		],
		seoTitle: 'Real Estate Lawyer in Turkey for Foreign Buyers',
		seoDescription:
			'Real estate lawyer in Turkey for foreigners buying property, title deed due diligence, power of attorney, payment risk, and property disputes.',
	},
	{
		slug: 'turkish-citizenship-lawyer',
		title: 'Turkish Citizenship Lawyer',
		tag: 'citizenship-law',
		relatedTags: ['citizenship', 'investment', 'real-estate-foreigners'],
		description:
			'Turkish citizenship by investment, property-based citizenship files, eligibility review, document planning, and application risk assessment.',
		icon: 'shield-check',
		heroTitle: 'Turkish Citizenship by Investment Lawyer',
		heroSummary:
			'We advise foreign investors on Turkish citizenship by investment, property-based applications, document preparation, eligibility risks, and transaction coordination.',
		sections: [
			{
				heading: 'Investment Route Assessment',
				text: 'We review whether the intended investment route, property file, payment structure, valuation, and timing align with citizenship application requirements.',
			},
			{
				heading: 'Property Citizenship Coordination',
				text: 'For property-based applications, we coordinate title deed restrictions, payment evidence, valuation documents, property due diligence, and application sequencing.',
			},
			{
				heading: 'Document and Name Consistency',
				text: 'Foreign documents, translations, passport details, name spelling, family records, and apostille or consular steps must be consistent before filing.',
			},
			{
				heading: 'Risk Review Before Filing',
				text: 'We identify common problems before submission, including incomplete payment trail, unsuitable property, document mismatch, prior immigration issues, and timing gaps.',
			},
		],
		faq: [
			{
				q: 'Is buying property enough for Turkish citizenship?',
				a: 'The property route has legal and administrative requirements beyond purchase price. Title restrictions, payment trail, valuation, eligibility, and documents must be reviewed.',
			},
			{
				q: 'Can the citizenship process start before the property transfer?',
				a: 'Some preparation can begin early, but the correct sequence depends on the transaction, investment route, documents, and official application requirements.',
			},
			{
				q: 'Do family members need separate documents?',
				a: 'Yes. Spouses and children usually require identity, civil status, birth, and family documents, with proper translation and authentication where applicable.',
			},
		],
		seoTitle: 'Turkish Citizenship Lawyer | Investment and Property Route',
		seoDescription:
			'Turkish citizenship lawyer for investment applications, property route review, document planning, eligibility checks, and application support.',
	},
	{
		slug: 'inheritance-lawyer-turkey-foreigners',
		title: 'Inheritance Lawyer in Turkey for Foreigners',
		tag: 'inheritance-foreigners',
		relatedTags: ['inheritance-law', 'foreign-heirs', 'real-estate-foreigners'],
		description:
			'Inheritance in Turkey for foreign heirs, Turkish property transfers, inheritance certificates, estate documents, and cross-border asset issues.',
		icon: 'scroll',
		heroTitle: 'Inheritance Lawyer in Turkey for Foreign Heirs',
		heroSummary:
			'We advise foreign heirs and families on Turkish inheritance certificates, property transfers, estate documentation, will issues, and inheritance disputes in Turkey.',
		sections: [
			{
				heading: 'Inheritance Certificate for Foreign Heirs',
				text: 'We guide foreign heirs through the documents needed to identify heirs and shares before Turkish property, bank, or registry steps can move forward.',
			},
			{
				heading: 'Transfer of Turkish Property',
				text: 'When the estate includes real estate in Turkey, we advise on title deed transfer steps, tax and registry coordination, and practical risks involving foreign documents.',
			},
			{
				heading: 'Wills and Cross-Border Documents',
				text: 'We review wills, death certificates, civil registry records, apostille issues, translations, and document consistency for use before Turkish authorities.',
			},
			{
				heading: 'Inheritance Disputes',
				text: 'We represent heirs in reserved share disputes, alleged sham transfers, co-owned property conflicts, and estate-related litigation involving Turkish assets.',
			},
		],
		faq: [
			{
				q: 'Can foreign heirs inherit property in Turkey?',
				a: 'Foreign heirs may inherit Turkish assets, but transfer steps depend on inheritance status, property eligibility, documents, tax steps, and registry procedures.',
			},
			{
				q: 'What documents do foreign heirs usually need?',
				a: 'Death certificate, identity documents, family or civil status records, wills if any, property records, translations, and apostilles may be needed depending on the case.',
			},
			{
				q: 'Is a foreign inheritance certificate enough in Turkey?',
				a: 'Not always. Turkish authorities may require a Turkish inheritance certificate or recognition of foreign documents, depending on the asset and procedure.',
			},
		],
		seoTitle: 'Inheritance Lawyer in Turkey for Foreign Heirs',
		seoDescription:
			'Inheritance lawyer in Turkey for foreign heirs, Turkish property transfer, inheritance certificates, estate documents, wills, and disputes.',
	},
	{
		slug: 'company-formation-lawyer-turkey',
		title: 'Company Formation Lawyer in Turkey',
		tag: 'company-formation',
		relatedTags: ['corporate-law', 'business-law', 'work-permit'],
		description:
			'Company setup in Turkey for foreigners, limited and joint-stock company structure, shareholder documents, signing authority, and work permit planning.',
		icon: 'building',
		heroTitle: 'Company Formation Lawyer in Turkey for Foreigners',
		heroSummary:
			'We advise foreign founders and investors on company formation in Turkey, shareholder structure, registry steps, signing authority, contracts, and work permit planning.',
		sections: [
			{
				heading: 'Company Type and Founder Structure',
				text: 'We help foreign founders evaluate company type, ownership structure, capital planning, manager or board authority, and legal documentation before incorporation.',
			},
			{
				heading: 'Formation Documents',
				text: 'We support articles of association, signature authority, shareholder details, registry documents, tax registration coordination, and post-incorporation obligations.',
			},
			{
				heading: 'Shareholder and Partner Agreements',
				text: 'We prepare and review agreements covering decision-making, reserved matters, exits, deadlock, confidentiality, transfer limits, and dispute resolution between founders.',
			},
			{
				heading: 'Work Permit and Immigration Planning',
				text: 'Foreign founders and employees may need work permit planning. We coordinate corporate setup with immigration timing and employer-side document expectations.',
			},
		],
		faq: [
			{
				q: 'Can foreigners open a company in Turkey?',
				a: 'Yes. Foreigners can establish companies in Turkey, but document preparation, shareholder structure, tax, signing authority, and work permit issues should be planned.',
			},
			{
				q: 'Which company type should a foreign founder choose?',
				a: 'Limited and joint-stock companies are common. The choice depends on ownership, investment plans, transfer flexibility, governance needs, and future fundraising.',
			},
			{
				q: 'Does opening a company automatically give a work permit?',
				a: 'No. Company formation and work permit status are separate. Foreign founders should review work permit requirements before working actively in Turkey.',
			},
		],
		seoTitle: 'Company Formation Lawyer in Turkey for Foreigners',
		seoDescription:
			'Company formation lawyer in Turkey for foreigners opening a company, shareholder structure, registry steps, contracts, and work permit planning.',
	},
	{
		slug: 'international-divorce-lawyer-turkey',
		title: 'International Divorce Lawyer in Turkey',
		tag: 'international-family-law',
		relatedTags: ['family-law', 'international-divorce'],
		description:
			'Divorce in Turkey involving foreign spouses, recognition of foreign divorce judgments, custody issues, property concerns, and settlement planning.',
		icon: 'family',
		heroTitle: 'International Divorce Lawyer in Turkey',
		heroSummary:
			'We advise foreign spouses and international families on divorce in Turkey, recognition of foreign divorce judgments, custody issues, settlement, and property concerns.',
		sections: [
			{
				heading: 'Divorce in Turkey for Foreigners',
				text: 'We assess jurisdiction, marriage documents, residence facts, service of process, settlement prospects, and court strategy where one or both spouses are foreign.',
			},
			{
				heading: 'Recognition of Foreign Divorce',
				text: 'We advise on recognition and enforcement of foreign divorce judgments so marital status, registry records, and related legal effects can be addressed in Turkey.',
			},
			{
				heading: 'Custody and Relocation Issues',
				text: 'International families may face custody, visitation, relocation, school, travel permission, and communication issues that need careful documentation and timing.',
			},
			{
				heading: 'Property and Settlement Planning',
				text: 'We review Turkish property, marital property questions, support terms, settlement protocols, and practical documentation needed before negotiation or filing.',
			},
		],
		faq: [
			{
				q: 'Can foreigners divorce in Turkey?',
				a: 'Foreigners may be able to divorce in Turkey depending on jurisdiction, residence, nationality, marriage records, and the facts of the case.',
			},
			{
				q: 'Does Turkey automatically recognize a foreign divorce?',
				a: 'Not always. Foreign divorce judgments may require administrative or court-based recognition steps before they fully affect Turkish records or legal status.',
			},
			{
				q: 'What documents are useful for an international divorce consultation?',
				a: 'Marriage certificate, identity documents, residence records, children-related documents, prior court decisions, property records, and any settlement drafts are useful.',
			},
		],
		seoTitle: 'International Divorce Lawyer in Turkey | Foreign Spouses',
		seoDescription:
			'International divorce lawyer in Turkey for foreign spouses, recognition of foreign divorce, custody, settlement, and Turkish property issues.',
	},
];

export const serviceAreasByLang: Record<Lang, ServiceArea[]> = {
	tr: serviceAreasTr,
	en: serviceAreasEn,
};

export const serviceAreas = serviceAreasTr;

export function getServiceAreas(lang: Lang): ServiceArea[] {
	return serviceAreasByLang[lang] ?? serviceAreasTr;
}

export function getServiceAreaBySlug(lang: Lang, slug: string): ServiceArea | undefined {
	return getServiceAreas(lang).find((area) => area.slug === slug);
}

export function getServicePostTags(area: ServiceArea): string[] {
	return [area.tag, ...(area.relatedTags ?? [])];
}
