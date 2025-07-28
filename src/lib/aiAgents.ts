// AI Agents Service using OpenAI API
import { deeplTranslator } from './deepl';

export interface AIAgentRequest {
  prompt: string;
  context?: string;
  language?: 'ar' | 'en';
  agentType?: 'general' | 'business' | 'negotiation' | 'analysis' | 'translation';
}

export interface AIAgentResponse {
  response: string;
  confidence: number;
  agentType: string;
  timestamp: Date;
}

export class AIAgentsService {
  private apiKey: string;
  private apiBase: string;

  constructor() {
    // Using environment variables that are already set
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  }

  private getSystemPrompt(agentType: string, language: string): string {
    const prompts = {
      general: {
        ar: 'أنت مساعد ذكي متخصص في منصة GPO SMART للتجارة الجماعية. تجيب بالعربية وتساعد المستخدمين في جميع استفساراتهم.',
        en: 'You are an intelligent assistant specialized in GPO SMART group purchasing platform. You answer in English and help users with all their inquiries.'
      },
      business: {
        ar: 'أنت خبير أعمال متخصص في التجارة الجماعية والمشتريات المؤسسية. تقدم نصائح استراتيجية وحلول عملية.',
        en: 'You are a business expert specialized in group purchasing and institutional procurement. You provide strategic advice and practical solutions.'
      },
      negotiation: {
        ar: 'أنت خبير مفاوضات تجارية متخصص في صفقات الشراء الجماعي. تساعد في وضع استراتيجيات التفاوض وتحليل العروض.',
        en: 'You are a commercial negotiation expert specialized in group purchasing deals. You help develop negotiation strategies and analyze offers.'
      },
      analysis: {
        ar: 'أنت محلل بيانات متخصص في تحليل أداء المجموعات التجارية والأسواق. تقدم تحليلات مفصلة ورؤى استراتيجية.',
        en: 'You are a data analyst specialized in analyzing business group performance and markets. You provide detailed analysis and strategic insights.'
      },
      translation: {
        ar: 'أنت مترجم محترف متخصص في الترجمة التجارية والقانونية. تقدم ترجمات دقيقة ومناسبة للسياق.',
        en: 'You are a professional translator specialized in business and legal translation. You provide accurate and context-appropriate translations.'
      }
    };

    return prompts[agentType as keyof typeof prompts]?.[language as keyof typeof prompts.general] || prompts.general[language as keyof typeof prompts.general];
  }

  async processRequest(request: AIAgentRequest): Promise<AIAgentResponse> {
    try {
      const language = request.language || 'ar';
      const agentType = request.agentType || 'general';
      const systemPrompt = this.getSystemPrompt(agentType, language);

      const messages = [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: request.context ? `السياق: ${request.context}\n\nالسؤال: ${request.prompt}` : request.prompt
        }
      ];

      const response = await fetch(`${this.apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return {
          response: data.choices[0].message.content,
          confidence: 0.9, // Mock confidence score
          agentType,
          timestamp: new Date()
        };
      } else {
        throw new Error('No response received from OpenAI API');
      }
    } catch (error) {
      console.error('AI Agent error:', error);
      throw error;
    }
  }

  async analyzeBusinessOpportunity(data: any): Promise<AIAgentResponse> {
    const prompt = `
    قم بتحليل الفرصة التجارية التالية:
    
    البيانات: ${JSON.stringify(data, null, 2)}
    
    يرجى تقديم تحليل شامل يتضمن:
    1. تقييم الفرصة
    2. المخاطر المحتملة
    3. التوصيات
    4. الخطوات التالية المقترحة
    `;

    return this.processRequest({
      prompt,
      agentType: 'analysis',
      language: 'ar'
    });
  }

  async generateNegotiationStrategy(dealInfo: any): Promise<AIAgentResponse> {
    const prompt = `
    قم بوضع استراتيجية تفاوض لهذه الصفقة:
    
    معلومات الصفقة: ${JSON.stringify(dealInfo, null, 2)}
    
    يرجى تقديم:
    1. نقاط القوة في موقفنا التفاوضي
    2. نقاط الضعف المحتملة
    3. استراتيجية التفاوض المقترحة
    4. البدائل والخيارات
    5. النتائج المتوقعة
    `;

    return this.processRequest({
      prompt,
      agentType: 'negotiation',
      language: 'ar'
    });
  }

  async translateWithContext(text: string, targetLanguage: string, context?: string): Promise<string> {
    try {
      // First try DeepL for better translation quality
      if (targetLanguage.toLowerCase() === 'ar' || targetLanguage.toLowerCase() === 'arabic') {
        return await deeplTranslator.translateToArabic(text);
      } else if (targetLanguage.toLowerCase() === 'en' || targetLanguage.toLowerCase() === 'english') {
        return await deeplTranslator.translateToEnglish(text);
      }

      // Fallback to AI translation for other languages or complex contexts
      const prompt = `
      قم بترجمة النص التالي إلى ${targetLanguage} مع مراعاة السياق:
      
      النص: ${text}
      ${context ? `السياق: ${context}` : ''}
      
      يرجى تقديم ترجمة دقيقة ومناسبة للسياق التجاري.
      `;

      const response = await this.processRequest({
        prompt,
        agentType: 'translation',
        language: 'ar'
      });

      return response.response;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async generateBusinessInsights(groupData: any): Promise<AIAgentResponse> {
    const prompt = `
    قم بتحليل بيانات المجموعة التجارية التالية وتقديم رؤى استراتيجية:
    
    بيانات المجموعة: ${JSON.stringify(groupData, null, 2)}
    
    يرجى تقديم:
    1. تحليل الأداء الحالي
    2. الفرص المتاحة
    3. التحديات والمخاطر
    4. توصيات للتحسين
    5. استراتيجيات النمو المقترحة
    `;

    return this.processRequest({
      prompt,
      agentType: 'business',
      language: 'ar'
    });
  }

  async automateTaskRecommendations(taskType: string, data: any): Promise<AIAgentResponse> {
    const prompt = `
    بناءً على نوع المهمة "${taskType}" والبيانات المتوفرة، قم بتقديم توصيات للأتمتة:
    
    البيانات: ${JSON.stringify(data, null, 2)}
    
    يرجى تقديم:
    1. المهام القابلة للأتمتة
    2. الأدوات والتقنيات المقترحة
    3. خطة التنفيذ
    4. الفوائد المتوقعة
    5. المخاطر والتحديات
    `;

    return this.processRequest({
      prompt,
      agentType: 'business',
      language: 'ar'
    });
  }
}

// Export a singleton instance
export const aiAgentsService = new AIAgentsService();

