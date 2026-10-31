import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LessonFavoriteModel = runtime.Types.Result.DefaultSelection<Prisma.$LessonFavoritePayload>;
export type AggregateLessonFavorite = {
    _count: LessonFavoriteCountAggregateOutputType | null;
    _min: LessonFavoriteMinAggregateOutputType | null;
    _max: LessonFavoriteMaxAggregateOutputType | null;
};
export type LessonFavoriteMinAggregateOutputType = {
    userId: string | null;
    lessonId: string | null;
    createdAt: Date | null;
};
export type LessonFavoriteMaxAggregateOutputType = {
    userId: string | null;
    lessonId: string | null;
    createdAt: Date | null;
};
export type LessonFavoriteCountAggregateOutputType = {
    userId: number;
    lessonId: number;
    createdAt: number;
    _all: number;
};
export type LessonFavoriteMinAggregateInputType = {
    userId?: true;
    lessonId?: true;
    createdAt?: true;
};
export type LessonFavoriteMaxAggregateInputType = {
    userId?: true;
    lessonId?: true;
    createdAt?: true;
};
export type LessonFavoriteCountAggregateInputType = {
    userId?: true;
    lessonId?: true;
    createdAt?: true;
    _all?: true;
};
export type LessonFavoriteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonFavoriteWhereInput;
    orderBy?: Prisma.LessonFavoriteOrderByWithRelationInput | Prisma.LessonFavoriteOrderByWithRelationInput[];
    cursor?: Prisma.LessonFavoriteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LessonFavoriteCountAggregateInputType;
    _min?: LessonFavoriteMinAggregateInputType;
    _max?: LessonFavoriteMaxAggregateInputType;
};
export type GetLessonFavoriteAggregateType<T extends LessonFavoriteAggregateArgs> = {
    [P in keyof T & keyof AggregateLessonFavorite]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLessonFavorite[P]> : Prisma.GetScalarType<T[P], AggregateLessonFavorite[P]>;
};
export type LessonFavoriteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonFavoriteWhereInput;
    orderBy?: Prisma.LessonFavoriteOrderByWithAggregationInput | Prisma.LessonFavoriteOrderByWithAggregationInput[];
    by: Prisma.LessonFavoriteScalarFieldEnum[] | Prisma.LessonFavoriteScalarFieldEnum;
    having?: Prisma.LessonFavoriteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LessonFavoriteCountAggregateInputType | true;
    _min?: LessonFavoriteMinAggregateInputType;
    _max?: LessonFavoriteMaxAggregateInputType;
};
export type LessonFavoriteGroupByOutputType = {
    userId: string;
    lessonId: string;
    createdAt: Date;
    _count: LessonFavoriteCountAggregateOutputType | null;
    _min: LessonFavoriteMinAggregateOutputType | null;
    _max: LessonFavoriteMaxAggregateOutputType | null;
};
export type GetLessonFavoriteGroupByPayload<T extends LessonFavoriteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LessonFavoriteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LessonFavoriteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LessonFavoriteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LessonFavoriteGroupByOutputType[P]>;
}>>;
export type LessonFavoriteWhereInput = {
    AND?: Prisma.LessonFavoriteWhereInput | Prisma.LessonFavoriteWhereInput[];
    OR?: Prisma.LessonFavoriteWhereInput[];
    NOT?: Prisma.LessonFavoriteWhereInput | Prisma.LessonFavoriteWhereInput[];
    userId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    lessonId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    createdAt?: Prisma.DateTimeFilter<"LessonFavorite"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
};
export type LessonFavoriteOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    lesson?: Prisma.LessonOrderByWithRelationInput;
};
export type LessonFavoriteWhereUniqueInput = Prisma.AtLeast<{
    userId_lessonId?: Prisma.LessonFavoriteUserIdLessonIdCompoundUniqueInput;
    AND?: Prisma.LessonFavoriteWhereInput | Prisma.LessonFavoriteWhereInput[];
    OR?: Prisma.LessonFavoriteWhereInput[];
    NOT?: Prisma.LessonFavoriteWhereInput | Prisma.LessonFavoriteWhereInput[];
    userId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    lessonId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    createdAt?: Prisma.DateTimeFilter<"LessonFavorite"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
}, "userId_lessonId">;
export type LessonFavoriteOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.LessonFavoriteCountOrderByAggregateInput;
    _max?: Prisma.LessonFavoriteMaxOrderByAggregateInput;
    _min?: Prisma.LessonFavoriteMinOrderByAggregateInput;
};
export type LessonFavoriteScalarWhereWithAggregatesInput = {
    AND?: Prisma.LessonFavoriteScalarWhereWithAggregatesInput | Prisma.LessonFavoriteScalarWhereWithAggregatesInput[];
    OR?: Prisma.LessonFavoriteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LessonFavoriteScalarWhereWithAggregatesInput | Prisma.LessonFavoriteScalarWhereWithAggregatesInput[];
    userId?: Prisma.UuidWithAggregatesFilter<"LessonFavorite"> | string;
    lessonId?: Prisma.UuidWithAggregatesFilter<"LessonFavorite"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LessonFavorite"> | Date | string;
};
export type LessonFavoriteCreateInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLessonFavoritesInput;
    lesson: Prisma.LessonCreateNestedOneWithoutFavoritesInput;
};
export type LessonFavoriteUncheckedCreateInput = {
    userId: string;
    lessonId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLessonFavoritesNestedInput;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutFavoritesNestedInput;
};
export type LessonFavoriteUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteCreateManyInput = {
    userId: string;
    lessonId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteListRelationFilter = {
    every?: Prisma.LessonFavoriteWhereInput;
    some?: Prisma.LessonFavoriteWhereInput;
    none?: Prisma.LessonFavoriteWhereInput;
};
export type LessonFavoriteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LessonFavoriteUserIdLessonIdCompoundUniqueInput = {
    userId: string;
    lessonId: string;
};
export type LessonFavoriteCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonFavoriteMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonFavoriteMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonFavoriteCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput> | Prisma.LessonFavoriteCreateWithoutUserInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutUserInput | Prisma.LessonFavoriteCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LessonFavoriteCreateManyUserInputEnvelope;
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
};
export type LessonFavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput> | Prisma.LessonFavoriteCreateWithoutUserInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutUserInput | Prisma.LessonFavoriteCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LessonFavoriteCreateManyUserInputEnvelope;
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
};
export type LessonFavoriteUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput> | Prisma.LessonFavoriteCreateWithoutUserInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutUserInput | Prisma.LessonFavoriteCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutUserInput | Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LessonFavoriteCreateManyUserInputEnvelope;
    set?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    disconnect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    delete?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    update?: Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutUserInput | Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LessonFavoriteUpdateManyWithWhereWithoutUserInput | Prisma.LessonFavoriteUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
};
export type LessonFavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput> | Prisma.LessonFavoriteCreateWithoutUserInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutUserInput | Prisma.LessonFavoriteCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutUserInput | Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LessonFavoriteCreateManyUserInputEnvelope;
    set?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    disconnect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    delete?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    update?: Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutUserInput | Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LessonFavoriteUpdateManyWithWhereWithoutUserInput | Prisma.LessonFavoriteUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
};
export type LessonFavoriteCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput> | Prisma.LessonFavoriteCreateWithoutLessonInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput | Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.LessonFavoriteCreateManyLessonInputEnvelope;
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
};
export type LessonFavoriteUncheckedCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput> | Prisma.LessonFavoriteCreateWithoutLessonInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput | Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.LessonFavoriteCreateManyLessonInputEnvelope;
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
};
export type LessonFavoriteUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput> | Prisma.LessonFavoriteCreateWithoutLessonInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput | Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutLessonInput | Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.LessonFavoriteCreateManyLessonInputEnvelope;
    set?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    disconnect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    delete?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    update?: Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutLessonInput | Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.LessonFavoriteUpdateManyWithWhereWithoutLessonInput | Prisma.LessonFavoriteUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
};
export type LessonFavoriteUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput> | Prisma.LessonFavoriteCreateWithoutLessonInput[] | Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput | Prisma.LessonFavoriteCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutLessonInput | Prisma.LessonFavoriteUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.LessonFavoriteCreateManyLessonInputEnvelope;
    set?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    disconnect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    delete?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    connect?: Prisma.LessonFavoriteWhereUniqueInput | Prisma.LessonFavoriteWhereUniqueInput[];
    update?: Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutLessonInput | Prisma.LessonFavoriteUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.LessonFavoriteUpdateManyWithWhereWithoutLessonInput | Prisma.LessonFavoriteUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
};
export type LessonFavoriteCreateWithoutUserInput = {
    createdAt?: Date | string;
    lesson: Prisma.LessonCreateNestedOneWithoutFavoritesInput;
};
export type LessonFavoriteUncheckedCreateWithoutUserInput = {
    lessonId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteCreateOrConnectWithoutUserInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput>;
};
export type LessonFavoriteCreateManyUserInputEnvelope = {
    data: Prisma.LessonFavoriteCreateManyUserInput | Prisma.LessonFavoriteCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type LessonFavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    update: Prisma.XOR<Prisma.LessonFavoriteUpdateWithoutUserInput, Prisma.LessonFavoriteUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutUserInput, Prisma.LessonFavoriteUncheckedCreateWithoutUserInput>;
};
export type LessonFavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateWithoutUserInput, Prisma.LessonFavoriteUncheckedUpdateWithoutUserInput>;
};
export type LessonFavoriteUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.LessonFavoriteScalarWhereInput;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateManyMutationInput, Prisma.LessonFavoriteUncheckedUpdateManyWithoutUserInput>;
};
export type LessonFavoriteScalarWhereInput = {
    AND?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
    OR?: Prisma.LessonFavoriteScalarWhereInput[];
    NOT?: Prisma.LessonFavoriteScalarWhereInput | Prisma.LessonFavoriteScalarWhereInput[];
    userId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    lessonId?: Prisma.UuidFilter<"LessonFavorite"> | string;
    createdAt?: Prisma.DateTimeFilter<"LessonFavorite"> | Date | string;
};
export type LessonFavoriteCreateWithoutLessonInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLessonFavoritesInput;
};
export type LessonFavoriteUncheckedCreateWithoutLessonInput = {
    userId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteCreateOrConnectWithoutLessonInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput>;
};
export type LessonFavoriteCreateManyLessonInputEnvelope = {
    data: Prisma.LessonFavoriteCreateManyLessonInput | Prisma.LessonFavoriteCreateManyLessonInput[];
    skipDuplicates?: boolean;
};
export type LessonFavoriteUpsertWithWhereUniqueWithoutLessonInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    update: Prisma.XOR<Prisma.LessonFavoriteUpdateWithoutLessonInput, Prisma.LessonFavoriteUncheckedUpdateWithoutLessonInput>;
    create: Prisma.XOR<Prisma.LessonFavoriteCreateWithoutLessonInput, Prisma.LessonFavoriteUncheckedCreateWithoutLessonInput>;
};
export type LessonFavoriteUpdateWithWhereUniqueWithoutLessonInput = {
    where: Prisma.LessonFavoriteWhereUniqueInput;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateWithoutLessonInput, Prisma.LessonFavoriteUncheckedUpdateWithoutLessonInput>;
};
export type LessonFavoriteUpdateManyWithWhereWithoutLessonInput = {
    where: Prisma.LessonFavoriteScalarWhereInput;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateManyMutationInput, Prisma.LessonFavoriteUncheckedUpdateManyWithoutLessonInput>;
};
export type LessonFavoriteCreateManyUserInput = {
    lessonId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutFavoritesNestedInput;
};
export type LessonFavoriteUncheckedUpdateWithoutUserInput = {
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteUncheckedUpdateManyWithoutUserInput = {
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteCreateManyLessonInput = {
    userId: string;
    createdAt?: Date | string;
};
export type LessonFavoriteUpdateWithoutLessonInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLessonFavoritesNestedInput;
};
export type LessonFavoriteUncheckedUpdateWithoutLessonInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteUncheckedUpdateManyWithoutLessonInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonFavoriteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    lessonId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonFavorite"]>;
export type LessonFavoriteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    lessonId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonFavorite"]>;
export type LessonFavoriteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    lessonId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonFavorite"]>;
export type LessonFavoriteSelectScalar = {
    userId?: boolean;
    lessonId?: boolean;
    createdAt?: boolean;
};
export type LessonFavoriteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "lessonId" | "createdAt", ExtArgs["result"]["lessonFavorite"]>;
export type LessonFavoriteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type LessonFavoriteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type LessonFavoriteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type $LessonFavoritePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LessonFavorite";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        lesson: Prisma.$LessonPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        lessonId: string;
        createdAt: Date;
    }, ExtArgs["result"]["lessonFavorite"]>;
    composites: {};
};
export type LessonFavoriteGetPayload<S extends boolean | null | undefined | LessonFavoriteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload, S>;
export type LessonFavoriteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LessonFavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LessonFavoriteCountAggregateInputType | true;
};
export interface LessonFavoriteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LessonFavorite'];
        meta: {
            name: 'LessonFavorite';
        };
    };
    findUnique<T extends LessonFavoriteFindUniqueArgs>(args: Prisma.SelectSubset<T, LessonFavoriteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LessonFavoriteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LessonFavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LessonFavoriteFindFirstArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteFindFirstArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LessonFavoriteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LessonFavoriteFindManyArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LessonFavoriteCreateArgs>(args: Prisma.SelectSubset<T, LessonFavoriteCreateArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LessonFavoriteCreateManyArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LessonFavoriteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LessonFavoriteDeleteArgs>(args: Prisma.SelectSubset<T, LessonFavoriteDeleteArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LessonFavoriteUpdateArgs>(args: Prisma.SelectSubset<T, LessonFavoriteUpdateArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LessonFavoriteDeleteManyArgs>(args?: Prisma.SelectSubset<T, LessonFavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LessonFavoriteUpdateManyArgs>(args: Prisma.SelectSubset<T, LessonFavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LessonFavoriteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LessonFavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LessonFavoriteUpsertArgs>(args: Prisma.SelectSubset<T, LessonFavoriteUpsertArgs<ExtArgs>>): Prisma.Prisma__LessonFavoriteClient<runtime.Types.Result.GetResult<Prisma.$LessonFavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LessonFavoriteCountArgs>(args?: Prisma.Subset<T, LessonFavoriteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LessonFavoriteCountAggregateOutputType> : number>;
    aggregate<T extends LessonFavoriteAggregateArgs>(args: Prisma.Subset<T, LessonFavoriteAggregateArgs>): Prisma.PrismaPromise<GetLessonFavoriteAggregateType<T>>;
    groupBy<T extends LessonFavoriteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LessonFavoriteGroupByArgs['orderBy'];
    } : {
        orderBy?: LessonFavoriteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LessonFavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LessonFavoriteFieldRefs;
}
export interface Prisma__LessonFavoriteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lesson<T extends Prisma.LessonDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LessonDefaultArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LessonFavoriteFieldRefs {
    readonly userId: Prisma.FieldRef<"LessonFavorite", 'String'>;
    readonly lessonId: Prisma.FieldRef<"LessonFavorite", 'String'>;
    readonly createdAt: Prisma.FieldRef<"LessonFavorite", 'DateTime'>;
}
export type LessonFavoriteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where: Prisma.LessonFavoriteWhereUniqueInput;
};
export type LessonFavoriteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where: Prisma.LessonFavoriteWhereUniqueInput;
};
export type LessonFavoriteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where?: Prisma.LessonFavoriteWhereInput;
    orderBy?: Prisma.LessonFavoriteOrderByWithRelationInput | Prisma.LessonFavoriteOrderByWithRelationInput[];
    cursor?: Prisma.LessonFavoriteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonFavoriteScalarFieldEnum | Prisma.LessonFavoriteScalarFieldEnum[];
};
export type LessonFavoriteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where?: Prisma.LessonFavoriteWhereInput;
    orderBy?: Prisma.LessonFavoriteOrderByWithRelationInput | Prisma.LessonFavoriteOrderByWithRelationInput[];
    cursor?: Prisma.LessonFavoriteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonFavoriteScalarFieldEnum | Prisma.LessonFavoriteScalarFieldEnum[];
};
export type LessonFavoriteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where?: Prisma.LessonFavoriteWhereInput;
    orderBy?: Prisma.LessonFavoriteOrderByWithRelationInput | Prisma.LessonFavoriteOrderByWithRelationInput[];
    cursor?: Prisma.LessonFavoriteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonFavoriteScalarFieldEnum | Prisma.LessonFavoriteScalarFieldEnum[];
};
export type LessonFavoriteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonFavoriteCreateInput, Prisma.LessonFavoriteUncheckedCreateInput>;
};
export type LessonFavoriteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LessonFavoriteCreateManyInput | Prisma.LessonFavoriteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LessonFavoriteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    data: Prisma.LessonFavoriteCreateManyInput | Prisma.LessonFavoriteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LessonFavoriteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LessonFavoriteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateInput, Prisma.LessonFavoriteUncheckedUpdateInput>;
    where: Prisma.LessonFavoriteWhereUniqueInput;
};
export type LessonFavoriteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateManyMutationInput, Prisma.LessonFavoriteUncheckedUpdateManyInput>;
    where?: Prisma.LessonFavoriteWhereInput;
    limit?: number;
};
export type LessonFavoriteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonFavoriteUpdateManyMutationInput, Prisma.LessonFavoriteUncheckedUpdateManyInput>;
    where?: Prisma.LessonFavoriteWhereInput;
    limit?: number;
    include?: Prisma.LessonFavoriteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LessonFavoriteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where: Prisma.LessonFavoriteWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonFavoriteCreateInput, Prisma.LessonFavoriteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LessonFavoriteUpdateInput, Prisma.LessonFavoriteUncheckedUpdateInput>;
};
export type LessonFavoriteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
    where: Prisma.LessonFavoriteWhereUniqueInput;
};
export type LessonFavoriteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonFavoriteWhereInput;
    limit?: number;
};
export type LessonFavoriteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonFavoriteSelect<ExtArgs> | null;
    omit?: Prisma.LessonFavoriteOmit<ExtArgs> | null;
    include?: Prisma.LessonFavoriteInclude<ExtArgs> | null;
};
