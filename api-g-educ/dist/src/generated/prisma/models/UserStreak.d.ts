import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserStreakModel = runtime.Types.Result.DefaultSelection<Prisma.$UserStreakPayload>;
export type AggregateUserStreak = {
    _count: UserStreakCountAggregateOutputType | null;
    _avg: UserStreakAvgAggregateOutputType | null;
    _sum: UserStreakSumAggregateOutputType | null;
    _min: UserStreakMinAggregateOutputType | null;
    _max: UserStreakMaxAggregateOutputType | null;
};
export type UserStreakAvgAggregateOutputType = {
    currentStreak: number | null;
    longestStreak: number | null;
};
export type UserStreakSumAggregateOutputType = {
    currentStreak: number | null;
    longestStreak: number | null;
};
export type UserStreakMinAggregateOutputType = {
    userId: string | null;
    currentStreak: number | null;
    longestStreak: number | null;
    lastActiveDate: Date | null;
    updatedAt: Date | null;
};
export type UserStreakMaxAggregateOutputType = {
    userId: string | null;
    currentStreak: number | null;
    longestStreak: number | null;
    lastActiveDate: Date | null;
    updatedAt: Date | null;
};
export type UserStreakCountAggregateOutputType = {
    userId: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: number;
    updatedAt: number;
    _all: number;
};
export type UserStreakAvgAggregateInputType = {
    currentStreak?: true;
    longestStreak?: true;
};
export type UserStreakSumAggregateInputType = {
    currentStreak?: true;
    longestStreak?: true;
};
export type UserStreakMinAggregateInputType = {
    userId?: true;
    currentStreak?: true;
    longestStreak?: true;
    lastActiveDate?: true;
    updatedAt?: true;
};
export type UserStreakMaxAggregateInputType = {
    userId?: true;
    currentStreak?: true;
    longestStreak?: true;
    lastActiveDate?: true;
    updatedAt?: true;
};
export type UserStreakCountAggregateInputType = {
    userId?: true;
    currentStreak?: true;
    longestStreak?: true;
    lastActiveDate?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserStreakAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStreakWhereInput;
    orderBy?: Prisma.UserStreakOrderByWithRelationInput | Prisma.UserStreakOrderByWithRelationInput[];
    cursor?: Prisma.UserStreakWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserStreakCountAggregateInputType;
    _avg?: UserStreakAvgAggregateInputType;
    _sum?: UserStreakSumAggregateInputType;
    _min?: UserStreakMinAggregateInputType;
    _max?: UserStreakMaxAggregateInputType;
};
export type GetUserStreakAggregateType<T extends UserStreakAggregateArgs> = {
    [P in keyof T & keyof AggregateUserStreak]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserStreak[P]> : Prisma.GetScalarType<T[P], AggregateUserStreak[P]>;
};
export type UserStreakGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStreakWhereInput;
    orderBy?: Prisma.UserStreakOrderByWithAggregationInput | Prisma.UserStreakOrderByWithAggregationInput[];
    by: Prisma.UserStreakScalarFieldEnum[] | Prisma.UserStreakScalarFieldEnum;
    having?: Prisma.UserStreakScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserStreakCountAggregateInputType | true;
    _avg?: UserStreakAvgAggregateInputType;
    _sum?: UserStreakSumAggregateInputType;
    _min?: UserStreakMinAggregateInputType;
    _max?: UserStreakMaxAggregateInputType;
};
export type UserStreakGroupByOutputType = {
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date | null;
    updatedAt: Date;
    _count: UserStreakCountAggregateOutputType | null;
    _avg: UserStreakAvgAggregateOutputType | null;
    _sum: UserStreakSumAggregateOutputType | null;
    _min: UserStreakMinAggregateOutputType | null;
    _max: UserStreakMaxAggregateOutputType | null;
};
export type GetUserStreakGroupByPayload<T extends UserStreakGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserStreakGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserStreakGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserStreakGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserStreakGroupByOutputType[P]>;
}>>;
export type UserStreakWhereInput = {
    AND?: Prisma.UserStreakWhereInput | Prisma.UserStreakWhereInput[];
    OR?: Prisma.UserStreakWhereInput[];
    NOT?: Prisma.UserStreakWhereInput | Prisma.UserStreakWhereInput[];
    userId?: Prisma.UuidFilter<"UserStreak"> | string;
    currentStreak?: Prisma.IntFilter<"UserStreak"> | number;
    longestStreak?: Prisma.IntFilter<"UserStreak"> | number;
    lastActiveDate?: Prisma.DateTimeNullableFilter<"UserStreak"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"UserStreak"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserStreakOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastActiveDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserStreakWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.UserStreakWhereInput | Prisma.UserStreakWhereInput[];
    OR?: Prisma.UserStreakWhereInput[];
    NOT?: Prisma.UserStreakWhereInput | Prisma.UserStreakWhereInput[];
    currentStreak?: Prisma.IntFilter<"UserStreak"> | number;
    longestStreak?: Prisma.IntFilter<"UserStreak"> | number;
    lastActiveDate?: Prisma.DateTimeNullableFilter<"UserStreak"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"UserStreak"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type UserStreakOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastActiveDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserStreakCountOrderByAggregateInput;
    _avg?: Prisma.UserStreakAvgOrderByAggregateInput;
    _max?: Prisma.UserStreakMaxOrderByAggregateInput;
    _min?: Prisma.UserStreakMinOrderByAggregateInput;
    _sum?: Prisma.UserStreakSumOrderByAggregateInput;
};
export type UserStreakScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserStreakScalarWhereWithAggregatesInput | Prisma.UserStreakScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserStreakScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserStreakScalarWhereWithAggregatesInput | Prisma.UserStreakScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"UserStreak"> | string;
    currentStreak?: Prisma.IntWithAggregatesFilter<"UserStreak"> | number;
    longestStreak?: Prisma.IntWithAggregatesFilter<"UserStreak"> | number;
    lastActiveDate?: Prisma.DateTimeNullableWithAggregatesFilter<"UserStreak"> | Date | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserStreak"> | Date | string;
};
export type UserStreakCreateInput = {
    currentStreak?: number;
    longestStreak?: number;
    lastActiveDate?: Date | string | null;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStreakInput;
};
export type UserStreakUncheckedCreateInput = {
    userId: string;
    currentStreak?: number;
    longestStreak?: number;
    lastActiveDate?: Date | string | null;
    updatedAt?: Date | string;
};
export type UserStreakUpdateInput = {
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStreakNestedInput;
};
export type UserStreakUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStreakCreateManyInput = {
    userId: string;
    currentStreak?: number;
    longestStreak?: number;
    lastActiveDate?: Date | string | null;
    updatedAt?: Date | string;
};
export type UserStreakUpdateManyMutationInput = {
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStreakUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStreakNullableScalarRelationFilter = {
    is?: Prisma.UserStreakWhereInput | null;
    isNot?: Prisma.UserStreakWhereInput | null;
};
export type UserStreakCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastActiveDate?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStreakAvgOrderByAggregateInput = {
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
};
export type UserStreakMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastActiveDate?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStreakMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastActiveDate?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStreakSumOrderByAggregateInput = {
    currentStreak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
};
export type UserStreakCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStreakCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStreakCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStreakCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserStreakUpsertWithoutUserInput;
    disconnect?: Prisma.UserStreakWhereInput | boolean;
    delete?: Prisma.UserStreakWhereInput | boolean;
    connect?: Prisma.UserStreakWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserStreakUpdateToOneWithWhereWithoutUserInput, Prisma.UserStreakUpdateWithoutUserInput>, Prisma.UserStreakUncheckedUpdateWithoutUserInput>;
};
export type UserStreakUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStreakCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserStreakUpsertWithoutUserInput;
    disconnect?: Prisma.UserStreakWhereInput | boolean;
    delete?: Prisma.UserStreakWhereInput | boolean;
    connect?: Prisma.UserStreakWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserStreakUpdateToOneWithWhereWithoutUserInput, Prisma.UserStreakUpdateWithoutUserInput>, Prisma.UserStreakUncheckedUpdateWithoutUserInput>;
};
export type UserStreakCreateWithoutUserInput = {
    currentStreak?: number;
    longestStreak?: number;
    lastActiveDate?: Date | string | null;
    updatedAt?: Date | string;
};
export type UserStreakUncheckedCreateWithoutUserInput = {
    currentStreak?: number;
    longestStreak?: number;
    lastActiveDate?: Date | string | null;
    updatedAt?: Date | string;
};
export type UserStreakCreateOrConnectWithoutUserInput = {
    where: Prisma.UserStreakWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
};
export type UserStreakUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserStreakUpdateWithoutUserInput, Prisma.UserStreakUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserStreakCreateWithoutUserInput, Prisma.UserStreakUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserStreakWhereInput;
};
export type UserStreakUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserStreakWhereInput;
    data: Prisma.XOR<Prisma.UserStreakUpdateWithoutUserInput, Prisma.UserStreakUncheckedUpdateWithoutUserInput>;
};
export type UserStreakUpdateWithoutUserInput = {
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStreakUncheckedUpdateWithoutUserInput = {
    currentStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActiveDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStreakSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    currentStreak?: boolean;
    longestStreak?: boolean;
    lastActiveDate?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStreak"]>;
export type UserStreakSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    currentStreak?: boolean;
    longestStreak?: boolean;
    lastActiveDate?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStreak"]>;
export type UserStreakSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    currentStreak?: boolean;
    longestStreak?: boolean;
    lastActiveDate?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStreak"]>;
export type UserStreakSelectScalar = {
    userId?: boolean;
    currentStreak?: boolean;
    longestStreak?: boolean;
    lastActiveDate?: boolean;
    updatedAt?: boolean;
};
export type UserStreakOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "currentStreak" | "longestStreak" | "lastActiveDate" | "updatedAt", ExtArgs["result"]["userStreak"]>;
export type UserStreakInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserStreakIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserStreakIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserStreakPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserStreak";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        currentStreak: number;
        longestStreak: number;
        lastActiveDate: Date | null;
        updatedAt: Date;
    }, ExtArgs["result"]["userStreak"]>;
    composites: {};
};
export type UserStreakGetPayload<S extends boolean | null | undefined | UserStreakDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserStreakPayload, S>;
export type UserStreakCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserStreakFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserStreakCountAggregateInputType | true;
};
export interface UserStreakDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserStreak'];
        meta: {
            name: 'UserStreak';
        };
    };
    findUnique<T extends UserStreakFindUniqueArgs>(args: Prisma.SelectSubset<T, UserStreakFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserStreakFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserStreakFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserStreakFindFirstArgs>(args?: Prisma.SelectSubset<T, UserStreakFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserStreakFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserStreakFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserStreakFindManyArgs>(args?: Prisma.SelectSubset<T, UserStreakFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserStreakCreateArgs>(args: Prisma.SelectSubset<T, UserStreakCreateArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserStreakCreateManyArgs>(args?: Prisma.SelectSubset<T, UserStreakCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserStreakCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserStreakCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserStreakDeleteArgs>(args: Prisma.SelectSubset<T, UserStreakDeleteArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserStreakUpdateArgs>(args: Prisma.SelectSubset<T, UserStreakUpdateArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserStreakDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserStreakDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserStreakUpdateManyArgs>(args: Prisma.SelectSubset<T, UserStreakUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserStreakUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserStreakUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserStreakUpsertArgs>(args: Prisma.SelectSubset<T, UserStreakUpsertArgs<ExtArgs>>): Prisma.Prisma__UserStreakClient<runtime.Types.Result.GetResult<Prisma.$UserStreakPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserStreakCountArgs>(args?: Prisma.Subset<T, UserStreakCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserStreakCountAggregateOutputType> : number>;
    aggregate<T extends UserStreakAggregateArgs>(args: Prisma.Subset<T, UserStreakAggregateArgs>): Prisma.PrismaPromise<GetUserStreakAggregateType<T>>;
    groupBy<T extends UserStreakGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserStreakGroupByArgs['orderBy'];
    } : {
        orderBy?: UserStreakGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserStreakGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStreakGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserStreakFieldRefs;
}
export interface Prisma__UserStreakClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserStreakFieldRefs {
    readonly userId: Prisma.FieldRef<"UserStreak", 'String'>;
    readonly currentStreak: Prisma.FieldRef<"UserStreak", 'Int'>;
    readonly longestStreak: Prisma.FieldRef<"UserStreak", 'Int'>;
    readonly lastActiveDate: Prisma.FieldRef<"UserStreak", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserStreak", 'DateTime'>;
}
export type UserStreakFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where?: Prisma.UserStreakWhereInput;
    orderBy?: Prisma.UserStreakOrderByWithRelationInput | Prisma.UserStreakOrderByWithRelationInput[];
    cursor?: Prisma.UserStreakWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStreakScalarFieldEnum | Prisma.UserStreakScalarFieldEnum[];
};
export type UserStreakFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where?: Prisma.UserStreakWhereInput;
    orderBy?: Prisma.UserStreakOrderByWithRelationInput | Prisma.UserStreakOrderByWithRelationInput[];
    cursor?: Prisma.UserStreakWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStreakScalarFieldEnum | Prisma.UserStreakScalarFieldEnum[];
};
export type UserStreakFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where?: Prisma.UserStreakWhereInput;
    orderBy?: Prisma.UserStreakOrderByWithRelationInput | Prisma.UserStreakOrderByWithRelationInput[];
    cursor?: Prisma.UserStreakWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStreakScalarFieldEnum | Prisma.UserStreakScalarFieldEnum[];
};
export type UserStreakCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStreakCreateInput, Prisma.UserStreakUncheckedCreateInput>;
};
export type UserStreakCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserStreakCreateManyInput | Prisma.UserStreakCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserStreakCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    data: Prisma.UserStreakCreateManyInput | Prisma.UserStreakCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserStreakIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserStreakUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStreakUpdateInput, Prisma.UserStreakUncheckedUpdateInput>;
    where: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserStreakUpdateManyMutationInput, Prisma.UserStreakUncheckedUpdateManyInput>;
    where?: Prisma.UserStreakWhereInput;
    limit?: number;
};
export type UserStreakUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStreakUpdateManyMutationInput, Prisma.UserStreakUncheckedUpdateManyInput>;
    where?: Prisma.UserStreakWhereInput;
    limit?: number;
    include?: Prisma.UserStreakIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserStreakUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where: Prisma.UserStreakWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserStreakCreateInput, Prisma.UserStreakUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserStreakUpdateInput, Prisma.UserStreakUncheckedUpdateInput>;
};
export type UserStreakDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
    where: Prisma.UserStreakWhereUniqueInput;
};
export type UserStreakDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStreakWhereInput;
    limit?: number;
};
export type UserStreakDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStreakSelect<ExtArgs> | null;
    omit?: Prisma.UserStreakOmit<ExtArgs> | null;
    include?: Prisma.UserStreakInclude<ExtArgs> | null;
};
