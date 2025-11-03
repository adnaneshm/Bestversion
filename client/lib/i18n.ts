export type Lang = 'fr' | 'ar';

const translations: Record<Lang, Record<string, string | Record<string,string>>> = {
  fr: {
    welcome_title: 'Bienvenue au Portail SHM',
    welcome_subtitle: 'Sélectionnez votre profil pour accéder aux ressources appropriées',
    member: 'Membre',
    chef: 'Chef',
    member_cta: 'Continuer en tant que Membre',
    chef_cta: 'Continuer en tant que Chef',
    create_account: 'Créer un compte',
    step_of: 'Étape {step} de {total}',
    tutor: 'Tuteur',
    dob_invalid: "Date de naissance invalide.",
    required_fields: 'Champ(s) obligatoires manquant(s) : {fields}',
    created_success: 'Compte créé avec succès',
    your_id: 'Votre identifiant :',
    niche_sans: '(sans niche)',
    niche_labels: {
      actualites: 'Actualités',
      organisation: 'Organisation',
      projet: 'Projet',
      rapports: 'Rapports',
      lois: 'Lois'
    },
    roles: {
      membre: 'Membre',
      chef_niche: 'Chef de niches',
      sous_chef: 'Sous-chef',
      chef_superieur: 'Chef supérieur'
    }
  },
  ar: {
    welcome_title: 'مرحبا بكم في بوابة SHM',
    welcome_subtitle: 'اختر ملفك للوصول إلى الموارد المناسبة',
    member: 'عضو',
    chef: 'قائد/قادة',
    member_cta: 'المتابعة كعضو',
    chef_cta: 'المتابعة كقائد',
    create_account: 'إنشاء حساب',
    step_of: 'المرحلة {step} من {total}',
    tutor: 'الوكيل/الولي',
    dob_invalid: 'تاريخ الميلاد غير صالح.',
    required_fields: 'حقول إجبارية مفقودة: {fields}',
    created_success: 'تم إنشاء ال��ساب بنجاح',
    your_id: 'معرّفك:',
    niche_sans: '(بدون خلية)',
    niche_labels: {
      actualites: 'أخبار',
      organisation: 'منظمة',
      projet: 'مشروع',
      rapports: 'تقارير',
      lois: 'قوانين'
    },
    roles: {
      membre: 'عضو',
      chef_niche: 'رئيس خلية',
      sous_chef: 'قائد',
      chef_superieur: 'قائد أعلى'
    }
  }
};

function detectLang(): Lang {
  try {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const q = params.get('lang');
    if (q === 'ar') return 'ar';
    const htmlLang = typeof document !== 'undefined' ? document.documentElement.lang : '';
    if (htmlLang && htmlLang.startsWith('ar')) return 'ar';
  } catch (e) {}
  return 'fr';
}

const lang = detectLang();

export function t(key: string, vars?: Record<string, string | number>) {
  const node = translations[lang] as any;
  const val = node && node[key];
  if (typeof val === 'string') {
    if (!vars) return val;
    let s = val;
    Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, String(vars[k])); });
    return s;
  }
  return val ?? key;
}

export function tRoles(): Record<string,string> {
  return (translations[lang] as any).roles || {};
}

export function tNiches(): Record<string,string> {
  return (translations[lang] as any).niche_labels || {};
}

export function currentLang() { return lang; }
