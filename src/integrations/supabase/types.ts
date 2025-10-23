export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      lead_submissions: {
        Row: {
          aid_type: string
          assigned_to: string | null
          building_type: string | null
          ceiling_height: number | null
          cold_room_volume: number | null
          company_name: string | null
          consent_partner: boolean
          consent_privacy: boolean
          construction_year: number | null
          created_at: string
          current_fixture_type: string | null
          current_lighting: string | null
          email: string
          employees: string | null
          first_name: string
          fixture_count: number | null
          heating_system: string | null
          id: string
          income_bracket: string | null
          insulation_type: string | null
          ip_address: string | null
          lamppost_height: number | null
          last_name: string
          notes: string | null
          pac_type: string | null
          phone: string
          postal_code: string
          project_data: Json | null
          referrer: string | null
          room_count: number | null
          siren: string | null
          status: string
          sun_exposure: string | null
          surface: number | null
          target_temperature: number | null
          usage_type: string | null
          user_agent: string | null
          user_type: string
          wall_material: string | null
          zone_type: string | null
        }
        Insert: {
          aid_type?: string
          assigned_to?: string | null
          building_type?: string | null
          ceiling_height?: number | null
          cold_room_volume?: number | null
          company_name?: string | null
          consent_partner?: boolean
          consent_privacy?: boolean
          construction_year?: number | null
          created_at?: string
          current_fixture_type?: string | null
          current_lighting?: string | null
          email: string
          employees?: string | null
          first_name: string
          fixture_count?: number | null
          heating_system?: string | null
          id?: string
          income_bracket?: string | null
          insulation_type?: string | null
          ip_address?: string | null
          lamppost_height?: number | null
          last_name: string
          notes?: string | null
          pac_type?: string | null
          phone: string
          postal_code: string
          project_data?: Json | null
          referrer?: string | null
          room_count?: number | null
          siren?: string | null
          status?: string
          sun_exposure?: string | null
          surface?: number | null
          target_temperature?: number | null
          usage_type?: string | null
          user_agent?: string | null
          user_type?: string
          wall_material?: string | null
          zone_type?: string | null
        }
        Update: {
          aid_type?: string
          assigned_to?: string | null
          building_type?: string | null
          ceiling_height?: number | null
          cold_room_volume?: number | null
          company_name?: string | null
          consent_partner?: boolean
          consent_privacy?: boolean
          construction_year?: number | null
          created_at?: string
          current_fixture_type?: string | null
          current_lighting?: string | null
          email?: string
          employees?: string | null
          first_name?: string
          fixture_count?: number | null
          heating_system?: string | null
          id?: string
          income_bracket?: string | null
          insulation_type?: string | null
          ip_address?: string | null
          lamppost_height?: number | null
          last_name?: string
          notes?: string | null
          pac_type?: string | null
          phone?: string
          postal_code?: string
          project_data?: Json | null
          referrer?: string | null
          room_count?: number | null
          siren?: string | null
          status?: string
          sun_exposure?: string | null
          surface?: number | null
          target_temperature?: number | null
          usage_type?: string | null
          user_agent?: string | null
          user_type?: string
          wall_material?: string | null
          zone_type?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
