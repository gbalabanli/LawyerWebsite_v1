export interface ServiceArea {
	slug: string;
	title: string;
	tag: string;
	description: string;
	icon: string;
	heroTitle: string;
	heroSummary: string;
	sections: { heading: string; text: string }[];
	faq: { q: string; a: string }[];
	seoTitle: string;
	seoDescription: string;
}

export const serviceAreas: ServiceArea[] = [
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
		title: 'E-Spor Hukuku',
		tag: 'espor',
		description:
			'E-spor oyuncu sözleşmeleri, transfer süreçleri, sponsorluk anlaşmaları, turnuva ödül dağıtımı ve e-spor ekosistemindeki hukuki ihtiyaçlara yönelik danışmanlık.',
		icon: 'gamepad',
		heroTitle: 'E-Spor Hukuku',
		heroSummary:
			'E-spor oyuncu sözleşmeleri, transfer süreçleri, sponsorluk anlaşmaları ve turnuva ödül dağıtımı alanında uzman hukuki danışmanlık hizmeti sunuyoruz.',
		sections: [
			{
				heading: 'E-Spor Oyuncu Sözleşmeleri',
				text: 'Profesyonel e-spor oyuncuları ve kulüpler arasındaki sözleşmelerin hazırlanması ve incelenmesi hizmeti veriyoruz. Maaş, ikramiye, ödül paylaşımı, gizlilik, yayıncılık hakları ve fesih koşulları gibi kritik maddelerin sözleşmede yer almasını sağlıyoruz.',
			},
			{
				heading: 'Transfer ve Buyout Süreçleri',
				text: 'E-spor oyuncu transferlerinde sözleşme feshi, buyout bedeli belirleme, TESFED lisans işlemleri ve kulüpler arası anlaşma süreçlerinde hukuki danışmanlık sağlıyoruz. Transfer dönemlerinde oyuncu ve kulüp haklarının korunmasına yönelik stratejik danışmanlık veriyoruz.',
			},
			{
				heading: 'Sponsorluk Anlaşmaları',
				text: 'E-spor takımları ve oyuncuları için sponsorluk sözleşmelerinin hazırlanması ve müzakeresi sürecinde danışmanlık veriyoruz. Marka kullanımı, performans kriterleri, ödeme koşulları ve fesih hakları gibi maddelerin dengeli şekilde düzenlenmesini sağlıyoruz.',
			},
			{
				heading: 'Turnuva Ödül Dağıtımı',
				text: 'E-spor turnuvalarında kazanılan ikramiye ve ödüllerin dağıtımında oyuncu, takım ve organizatör arasındaki hukuki ilişkinin düzenlenmesi konusunda danışmanlık veriyoruz. Ödül paylaşım oranları ve ödeme takviminin sözleşmeye bağlanması uyuşmazlıkları önler.',
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
		seoTitle: 'E-Spor Hukuku Avukatı | Oyuncu Sözleşmeleri ve Transfer',
		seoDescription:
			'E-spor oyuncu sözleşmeleri, transfer süreçleri, sponsorluk anlaşmaları ve turnuva ödül dağıtımında uzman e-spor avukatı. İstanbul merkezli hukuki danışmanlık hizmeti.',
	},
];
