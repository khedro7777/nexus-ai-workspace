export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      arbitration_requests: {
        Row: {
          created_at: string | null
          description: string
          dispute_type: string | null
          evidence_files: Json | null
          group_id: string | null
          id: string
          requested_action: string | null
          requester_id: string | null
          status: string | null
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          dispute_type?: string | null
          evidence_files?: Json | null
          group_id?: string | null
          id?: string
          requested_action?: string | null
          requester_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          dispute_type?: string | null
          evidence_files?: Json | null
          group_id?: string | null
          id?: string
          requested_action?: string | null
          requester_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arbitration_requests_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_offers: {
        Row: {
          additional_notes: string | null
          created_at: string | null
          delivery_time: string | null
          description: string | null
          freelancer_id: string | null
          group_id: string | null
          id: string
          offer_description: string
          price: number | null
          status: string | null
          timeline_days: number | null
          title: string | null
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          offer_description: string
          price?: number | null
          status?: string | null
          timeline_days?: number | null
          title?: string | null
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          offer_description?: string
          price?: number | null
          status?: string | null
          timeline_days?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_offers_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          contract_type: string | null
          country: string | null
          created_at: string | null
          creator_id: string
          current_members: number | null
          description: string | null
          group_type: string | null
          id: string
          max_members: number | null
          min_entry_amount: number | null
          name: string
          negotiation_rounds: number | null
          requires_suppliers: boolean | null
          sector: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          creator_id: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          max_members?: number | null
          min_entry_amount?: number | null
          name: string
          negotiation_rounds?: number | null
          requires_suppliers?: boolean | null
          sector?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          creator_id?: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          max_members?: number | null
          min_entry_amount?: number | null
          name?: string
          negotiation_rounds?: number | null
          requires_suppliers?: boolean | null
          sector?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          company: string | null
          country: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          full_name: string
          id: string
          phone: string | null
          skills: string | null
          updated_at: string | null
          user_role: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name: string
          id: string
          phone?: string | null
          skills?: string | null
          updated_at?: string | null
          user_role?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string
          id?: string
          phone?: string | null
          skills?: string | null
          updated_at?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      supplier_offers: {
        Row: {
          company_name: string | null
          created_at: string | null
          delivery_terms: string | null
          delivery_time: string | null
          description: string | null
          group_id: string | null
          id: string
          offer_description: string
          payment_terms: string | null
          price: number | null
          price_details: Json | null
          status: string | null
          supplier_id: string | null
          terms: string | null
          title: string | null
          valid_until: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          delivery_terms?: string | null
          delivery_time?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          offer_description: string
          payment_terms?: string | null
          price?: number | null
          price_details?: Json | null
          status?: string | null
          supplier_id?: string | null
          terms?: string | null
          title?: string | null
          valid_until?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          delivery_terms?: string | null
          delivery_time?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          offer_description?: string
          payment_terms?: string | null
          price?: number | null
          price_details?: Json | null
          status?: string | null
          supplier_id?: string | null
          terms?: string | null
          title?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_offers_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          id: string
          option_selected: string
          user_id: string | null
          voted_at: string | null
          voting_session_id: string | null
        }
        Insert: {
          id?: string
          option_selected: string
          user_id?: string | null
          voted_at?: string | null
          voting_session_id?: string | null
        }
        Update: {
          id?: string
          option_selected?: string
          user_id?: string | null
          voted_at?: string | null
          voting_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_voting_session_id_fkey"
            columns: ["voting_session_id"]
            isOneToOne: false
            referencedRelation: "voting_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_sessions: {
        Row: {
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          group_id: string | null
          id: string
          options: Json
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options: Json
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options?: Json
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "voting_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
