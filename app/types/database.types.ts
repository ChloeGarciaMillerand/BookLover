export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    extensions?: Json;
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            book: {
                Row: {
                    author: string | null;
                    comment: string | null;
                    created_at: string;
                    editor: string | null;
                    genre_id: string | null;
                    id: string;
                    ISBN: string | null;
                    library_code: string | null;
                    title: string;
                };
                Insert: {
                    author?: string | null;
                    comment?: string | null;
                    created_at?: string;
                    editor?: string | null;
                    genre_id?: string | null;
                    id?: string;
                    ISBN?: string | null;
                    library_code?: string | null;
                    title: string;
                };
                Update: {
                    author?: string | null;
                    comment?: string | null;
                    created_at?: string;
                    editor?: string | null;
                    genre_id?: string | null;
                    id?: string;
                    ISBN?: string | null;
                    library_code?: string | null;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "book_genre_id_fkey";
                        columns: ["genre_id"];
                        isOneToOne: false;
                        referencedRelation: "genre";
                        referencedColumns: ["id"];
                    },
                ];
            };
            booklist: {
                Row: {
                    book_id: string | null;
                    created_at: string;
                    id: string;
                    list_id: string | null;
                };
                Insert: {
                    book_id?: string | null;
                    created_at?: string;
                    id?: string;
                    list_id?: string | null;
                };
                Update: {
                    book_id?: string | null;
                    created_at?: string;
                    id?: string;
                    list_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "booklist_book_id_fkey";
                        columns: ["book_id"];
                        isOneToOne: false;
                        referencedRelation: "book";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "booklist_list_id_fkey";
                        columns: ["list_id"];
                        isOneToOne: false;
                        referencedRelation: "list";
                        referencedColumns: ["id"];
                    },
                ];
            };
            genre: {
                Row: {
                    color: string;
                    created_at: string;
                    id: string;
                    name: string;
                    user_id: string | null;
                };
                Insert: {
                    color: string;
                    created_at?: string;
                    id?: string;
                    name: string;
                    user_id?: string | null;
                };
                Update: {
                    color?: string;
                    created_at?: string;
                    id?: string;
                    name?: string;
                    user_id?: string | null;
                };
                Relationships: [];
            };
            list: {
                Row: {
                    created_at: string;
                    id: string;
                    name: string;
                    organization_id: string | null;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    name: string;
                    organization_id?: string | null;
                    user_id?: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                    organization_id?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "list_organization_id_fkey";
                        columns: ["organization_id"];
                        isOneToOne: false;
                        referencedRelation: "organization";
                        referencedColumns: ["id"];
                    },
                ];
            };
            organization: {
                Row: {
                    created_at: string;
                    id: string;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {},
    },
} as const;
