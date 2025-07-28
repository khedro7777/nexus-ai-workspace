// DeepL Translation Service
const DEEPL_API_KEY = '27035f5e-2a57-4b10-b91d-83123542020a:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export interface TranslationRequest {
  text: string;
  targetLang: string;
  sourceLang?: string;
}

export interface TranslationResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

export class DeepLTranslationService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = DEEPL_API_KEY;
    this.apiUrl = DEEPL_API_URL;
  }

  async translateText(request: TranslationRequest): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('auth_key', this.apiKey);
      formData.append('text', request.text);
      formData.append('target_lang', request.targetLang.toUpperCase());
      
      if (request.sourceLang) {
        formData.append('source_lang', request.sourceLang.toUpperCase());
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
      }

      const data: TranslationResponse = await response.json();
      
      if (data.translations && data.translations.length > 0) {
        return data.translations[0].text;
      } else {
        throw new Error('No translation received from DeepL API');
      }
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async translateToArabic(text: string, sourceLang?: string): Promise<string> {
    return this.translateText({
      text,
      targetLang: 'AR',
      sourceLang
    });
  }

  async translateToEnglish(text: string, sourceLang?: string): Promise<string> {
    return this.translateText({
      text,
      targetLang: 'EN',
      sourceLang
    });
  }

  async detectLanguage(text: string): Promise<string> {
    try {
      // Use a translation to English to detect the source language
      const result = await this.translateText({
        text,
        targetLang: 'EN'
      });
      
      // The API response includes detected_source_language
      const formData = new FormData();
      formData.append('auth_key', this.apiKey);
      formData.append('text', text);
      formData.append('target_lang', 'EN');

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data: TranslationResponse = await response.json();
        if (data.translations && data.translations.length > 0) {
          return data.translations[0].detected_source_language;
        }
      }
      
      return 'unknown';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'unknown';
    }
  }

  // Supported languages for reference
  getSupportedLanguages() {
    return {
      'AR': 'Arabic',
      'BG': 'Bulgarian',
      'CS': 'Czech',
      'DA': 'Danish',
      'DE': 'German',
      'EL': 'Greek',
      'EN': 'English',
      'ES': 'Spanish',
      'ET': 'Estonian',
      'FI': 'Finnish',
      'FR': 'French',
      'HU': 'Hungarian',
      'ID': 'Indonesian',
      'IT': 'Italian',
      'JA': 'Japanese',
      'KO': 'Korean',
      'LT': 'Lithuanian',
      'LV': 'Latvian',
      'NB': 'Norwegian (Bokmål)',
      'NL': 'Dutch',
      'PL': 'Polish',
      'PT': 'Portuguese',
      'RO': 'Romanian',
      'RU': 'Russian',
      'SK': 'Slovak',
      'SL': 'Slovenian',
      'SV': 'Swedish',
      'TR': 'Turkish',
      'UK': 'Ukrainian',
      'ZH': 'Chinese (simplified)'
    };
  }
}

// Export a singleton instance
export const deeplTranslator = new DeepLTranslationService();

