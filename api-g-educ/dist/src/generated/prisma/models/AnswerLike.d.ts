import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AnswerLikeModel = runtime.Types.Result.DefaultSelection<Prisma.$AnswerLikePayload>;
export type AggregateAnswerLike = {
    _count: AnswerLikeCountAggregateOutputType | null;
    _min: AnswerLikeMinAggregateOutputType | null;
    _max: AnswerLikeMaxAggregateOutputType | null;
};
export type AnswerLikeMinAggregateOutputType = {
    answerId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type AnswerLikeMaxAggregateOutputType = {
    answerId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type AnswerLikeCountAggregateOutputType = {
    answerId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type AnswerLikeMinAggregateInputType = {
    answerId?: true;
    userId?: true;
    createdAt?: true;
};
export type AnswerLikeMaxAggregateInputType = {
    answerId?: true;
    userId?: true;
    createdAt?: true;
};
export type AnswerLikeCountAggregateInputType = {
    answerId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type AnswerLikeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnswerLikeWhereInput;
    orderBy?: Prisma.AnswerLikeOrderByWithRelationInput | Prisma.AnswerLikeOrderByWithRelationInput[];
    cursor?: Prisma.AnswerLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AnswerLikeCountAggregateInputType;
    _min?: AnswerLikeMinAggregateInputType;
    _max?: AnswerLikeMaxAggregateInputType;
};
export type GetAnswerLikeAggregateType<T extends AnswerLikeAggregateArgs> = {
    [P in keyof T & keyof AggregateAnswerLike]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAnswerLike[P]> : Prisma.GetScalarType<T[P], AggregateAnswerLike[P]>;
};
export type AnswerLikeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnswerLikeWhereInput;
    orderBy?: Prisma.AnswerLikeOrderByWithAggregationInput | Prisma.AnswerLikeOrderByWithAggregationInput[];
    by: Prisma.AnswerLikeScalarFieldEnum[] | Prisma.AnswerLikeScalarFieldEnum;
    having?: Prisma.AnswerLikeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AnswerLikeCountAggregateInputType | true;
    _min?: AnswerLikeMinAggregateInputType;
    _max?: AnswerLikeMaxAggregateInputType;
};
export type AnswerLikeGroupByOutputType = {
    answerId: string;
    userId: string;
    createdAt: Date;
    _count: AnswerLikeCountAggregateOutputType | null;
    _min: AnswerLikeMinAggregateOutputType | null;
    _max: AnswerLikeMaxAggregateOutputType | null;
};
export type GetAnswerLikeGroupByPayload<T extends AnswerLikeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AnswerLikeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AnswerLikeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AnswerLikeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AnswerLikeGroupByOutputType[P]>;
}>>;
export type AnswerLikeWhereInput = {
    AND?: Prisma.AnswerLikeWhereInput | Prisma.AnswerLikeWhereInput[];
    OR?: Prisma.AnswerLikeWhereInput[];
    NOT?: Prisma.AnswerLikeWhereInput | Prisma.AnswerLikeWhereInput[];
    answerId?: Prisma.UuidFilter<"AnswerLike"> | string;
    userId?: Prisma.UuidFilter<"AnswerLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"AnswerLike"> | Date | string;
    answer?: Prisma.XOR<Prisma.ForumAnswerScalarRelationFilter, Prisma.ForumAnswerWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AnswerLikeOrderByWithRelationInput = {
    answerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    answer?: Prisma.ForumAnswerOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AnswerLikeWhereUniqueInput = Prisma.AtLeast<{
    answerId_userId?: Prisma.AnswerLikeAnswerIdUserIdCompoundUniqueInput;
    AND?: Prisma.AnswerLikeWhereInput | Prisma.AnswerLikeWhereInput[];
    OR?: Prisma.AnswerLikeWhereInput[];
    NOT?: Prisma.AnswerLikeWhereInput | Prisma.AnswerLikeWhereInput[];
    answerId?: Prisma.UuidFilter<"AnswerLike"> | string;
    userId?: Prisma.UuidFilter<"AnswerLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"AnswerLike"> | Date | string;
    answer?: Prisma.XOR<Prisma.ForumAnswerScalarRelationFilter, Prisma.ForumAnswerWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "answerId_userId">;
export type AnswerLikeOrderByWithAggregationInput = {
    answerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AnswerLikeCountOrderByAggregateInput;
    _max?: Prisma.AnswerLikeMaxOrderByAggregateInput;
    _min?: Prisma.AnswerLikeMinOrderByAggregateInput;
};
export type AnswerLikeScalarWhereWithAggregatesInput = {
    AND?: Prisma.AnswerLikeScalarWhereWithAggregatesInput | Prisma.AnswerLikeScalarWhereWithAggregatesInput[];
    OR?: Prisma.AnswerLikeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AnswerLikeScalarWhereWithAggregatesInput | Prisma.AnswerLikeScalarWhereWithAggregatesInput[];
    answerId?: Prisma.UuidWithAggregatesFilter<"AnswerLike"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"AnswerLike"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AnswerLike"> | Date | string;
};
export type AnswerLikeCreateInput = {
    createdAt?: Date | string;
    answer: Prisma.ForumAnswerCreateNestedOneWithoutLikesInput;
    user: Prisma.UserCreateNestedOneWithoutAnswerLikesInput;
};
export type AnswerLikeUncheckedCreateInput = {
    answerId: string;
    userId: string;
    createdAt?: Date | string;
};
export type AnswerLikeUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answer?: Prisma.ForumAnswerUpdateOneRequiredWithoutLikesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutAnswerLikesNestedInput;
};
export type AnswerLikeUncheckedUpdateInput = {
    answerId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeCreateManyInput = {
    answerId: string;
    userId: string;
    createdAt?: Date | string;
};
export type AnswerLikeUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeUncheckedUpdateManyInput = {
    answerId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeListRelationFilter = {
    every?: Prisma.AnswerLikeWhereInput;
    some?: Prisma.AnswerLikeWhereInput;
    none?: Prisma.AnswerLikeWhereInput;
};
export type AnswerLikeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AnswerLikeAnswerIdUserIdCompoundUniqueInput = {
    answerId: string;
    userId: string;
};
export type AnswerLikeCountOrderByAggregateInput = {
    answerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnswerLikeMaxOrderByAggregateInput = {
    answerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnswerLikeMinOrderByAggregateInput = {
    answerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnswerLikeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput> | Prisma.AnswerLikeCreateWithoutUserInput[] | Prisma.AnswerLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutUserInput | Prisma.AnswerLikeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AnswerLikeCreateManyUserInputEnvelope;
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
};
export type AnswerLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput> | Prisma.AnswerLikeCreateWithoutUserInput[] | Prisma.AnswerLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutUserInput | Prisma.AnswerLikeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AnswerLikeCreateManyUserInputEnvelope;
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
};
export type AnswerLikeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput> | Prisma.AnswerLikeCreateWithoutUserInput[] | Prisma.AnswerLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutUserInput | Prisma.AnswerLikeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AnswerLikeUpsertWithWhereUniqueWithoutUserInput | Prisma.AnswerLikeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AnswerLikeCreateManyUserInputEnvelope;
    set?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    disconnect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    delete?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    update?: Prisma.AnswerLikeUpdateWithWhereUniqueWithoutUserInput | Prisma.AnswerLikeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AnswerLikeUpdateManyWithWhereWithoutUserInput | Prisma.AnswerLikeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
};
export type AnswerLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput> | Prisma.AnswerLikeCreateWithoutUserInput[] | Prisma.AnswerLikeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutUserInput | Prisma.AnswerLikeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AnswerLikeUpsertWithWhereUniqueWithoutUserInput | Prisma.AnswerLikeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AnswerLikeCreateManyUserInputEnvelope;
    set?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    disconnect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    delete?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    update?: Prisma.AnswerLikeUpdateWithWhereUniqueWithoutUserInput | Prisma.AnswerLikeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AnswerLikeUpdateManyWithWhereWithoutUserInput | Prisma.AnswerLikeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
};
export type AnswerLikeCreateNestedManyWithoutAnswerInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput> | Prisma.AnswerLikeCreateWithoutAnswerInput[] | Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput | Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput[];
    createMany?: Prisma.AnswerLikeCreateManyAnswerInputEnvelope;
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
};
export type AnswerLikeUncheckedCreateNestedManyWithoutAnswerInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput> | Prisma.AnswerLikeCreateWithoutAnswerInput[] | Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput | Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput[];
    createMany?: Prisma.AnswerLikeCreateManyAnswerInputEnvelope;
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
};
export type AnswerLikeUpdateManyWithoutAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput> | Prisma.AnswerLikeCreateWithoutAnswerInput[] | Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput | Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput[];
    upsert?: Prisma.AnswerLikeUpsertWithWhereUniqueWithoutAnswerInput | Prisma.AnswerLikeUpsertWithWhereUniqueWithoutAnswerInput[];
    createMany?: Prisma.AnswerLikeCreateManyAnswerInputEnvelope;
    set?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    disconnect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    delete?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    update?: Prisma.AnswerLikeUpdateWithWhereUniqueWithoutAnswerInput | Prisma.AnswerLikeUpdateWithWhereUniqueWithoutAnswerInput[];
    updateMany?: Prisma.AnswerLikeUpdateManyWithWhereWithoutAnswerInput | Prisma.AnswerLikeUpdateManyWithWhereWithoutAnswerInput[];
    deleteMany?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
};
export type AnswerLikeUncheckedUpdateManyWithoutAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput> | Prisma.AnswerLikeCreateWithoutAnswerInput[] | Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput | Prisma.AnswerLikeCreateOrConnectWithoutAnswerInput[];
    upsert?: Prisma.AnswerLikeUpsertWithWhereUniqueWithoutAnswerInput | Prisma.AnswerLikeUpsertWithWhereUniqueWithoutAnswerInput[];
    createMany?: Prisma.AnswerLikeCreateManyAnswerInputEnvelope;
    set?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    disconnect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    delete?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    connect?: Prisma.AnswerLikeWhereUniqueInput | Prisma.AnswerLikeWhereUniqueInput[];
    update?: Prisma.AnswerLikeUpdateWithWhereUniqueWithoutAnswerInput | Prisma.AnswerLikeUpdateWithWhereUniqueWithoutAnswerInput[];
    updateMany?: Prisma.AnswerLikeUpdateManyWithWhereWithoutAnswerInput | Prisma.AnswerLikeUpdateManyWithWhereWithoutAnswerInput[];
    deleteMany?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
};
export type AnswerLikeCreateWithoutUserInput = {
    createdAt?: Date | string;
    answer: Prisma.ForumAnswerCreateNestedOneWithoutLikesInput;
};
export type AnswerLikeUncheckedCreateWithoutUserInput = {
    answerId: string;
    createdAt?: Date | string;
};
export type AnswerLikeCreateOrConnectWithoutUserInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput>;
};
export type AnswerLikeCreateManyUserInputEnvelope = {
    data: Prisma.AnswerLikeCreateManyUserInput | Prisma.AnswerLikeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AnswerLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    update: Prisma.XOR<Prisma.AnswerLikeUpdateWithoutUserInput, Prisma.AnswerLikeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AnswerLikeCreateWithoutUserInput, Prisma.AnswerLikeUncheckedCreateWithoutUserInput>;
};
export type AnswerLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateWithoutUserInput, Prisma.AnswerLikeUncheckedUpdateWithoutUserInput>;
};
export type AnswerLikeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AnswerLikeScalarWhereInput;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateManyMutationInput, Prisma.AnswerLikeUncheckedUpdateManyWithoutUserInput>;
};
export type AnswerLikeScalarWhereInput = {
    AND?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
    OR?: Prisma.AnswerLikeScalarWhereInput[];
    NOT?: Prisma.AnswerLikeScalarWhereInput | Prisma.AnswerLikeScalarWhereInput[];
    answerId?: Prisma.UuidFilter<"AnswerLike"> | string;
    userId?: Prisma.UuidFilter<"AnswerLike"> | string;
    createdAt?: Prisma.DateTimeFilter<"AnswerLike"> | Date | string;
};
export type AnswerLikeCreateWithoutAnswerInput = {
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAnswerLikesInput;
};
export type AnswerLikeUncheckedCreateWithoutAnswerInput = {
    userId: string;
    createdAt?: Date | string;
};
export type AnswerLikeCreateOrConnectWithoutAnswerInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput>;
};
export type AnswerLikeCreateManyAnswerInputEnvelope = {
    data: Prisma.AnswerLikeCreateManyAnswerInput | Prisma.AnswerLikeCreateManyAnswerInput[];
    skipDuplicates?: boolean;
};
export type AnswerLikeUpsertWithWhereUniqueWithoutAnswerInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    update: Prisma.XOR<Prisma.AnswerLikeUpdateWithoutAnswerInput, Prisma.AnswerLikeUncheckedUpdateWithoutAnswerInput>;
    create: Prisma.XOR<Prisma.AnswerLikeCreateWithoutAnswerInput, Prisma.AnswerLikeUncheckedCreateWithoutAnswerInput>;
};
export type AnswerLikeUpdateWithWhereUniqueWithoutAnswerInput = {
    where: Prisma.AnswerLikeWhereUniqueInput;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateWithoutAnswerInput, Prisma.AnswerLikeUncheckedUpdateWithoutAnswerInput>;
};
export type AnswerLikeUpdateManyWithWhereWithoutAnswerInput = {
    where: Prisma.AnswerLikeScalarWhereInput;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateManyMutationInput, Prisma.AnswerLikeUncheckedUpdateManyWithoutAnswerInput>;
};
export type AnswerLikeCreateManyUserInput = {
    answerId: string;
    createdAt?: Date | string;
};
export type AnswerLikeUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answer?: Prisma.ForumAnswerUpdateOneRequiredWithoutLikesNestedInput;
};
export type AnswerLikeUncheckedUpdateWithoutUserInput = {
    answerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeUncheckedUpdateManyWithoutUserInput = {
    answerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeCreateManyAnswerInput = {
    userId: string;
    createdAt?: Date | string;
};
export type AnswerLikeUpdateWithoutAnswerInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAnswerLikesNestedInput;
};
export type AnswerLikeUncheckedUpdateWithoutAnswerInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeUncheckedUpdateManyWithoutAnswerInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnswerLikeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    answerId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["answerLike"]>;
export type AnswerLikeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    answerId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["answerLike"]>;
export type AnswerLikeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    answerId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["answerLike"]>;
export type AnswerLikeSelectScalar = {
    answerId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type AnswerLikeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"answerId" | "userId" | "createdAt", ExtArgs["result"]["answerLike"]>;
export type AnswerLikeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AnswerLikeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AnswerLikeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answer?: boolean | Prisma.ForumAnswerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AnswerLikePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AnswerLike";
    objects: {
        answer: Prisma.$ForumAnswerPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        answerId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["answerLike"]>;
    composites: {};
};
export type AnswerLikeGetPayload<S extends boolean | null | undefined | AnswerLikeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload, S>;
export type AnswerLikeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AnswerLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AnswerLikeCountAggregateInputType | true;
};
export interface AnswerLikeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AnswerLike'];
        meta: {
            name: 'AnswerLike';
        };
    };
    findUnique<T extends AnswerLikeFindUniqueArgs>(args: Prisma.SelectSubset<T, AnswerLikeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AnswerLikeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AnswerLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AnswerLikeFindFirstArgs>(args?: Prisma.SelectSubset<T, AnswerLikeFindFirstArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AnswerLikeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AnswerLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AnswerLikeFindManyArgs>(args?: Prisma.SelectSubset<T, AnswerLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AnswerLikeCreateArgs>(args: Prisma.SelectSubset<T, AnswerLikeCreateArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AnswerLikeCreateManyArgs>(args?: Prisma.SelectSubset<T, AnswerLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AnswerLikeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AnswerLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AnswerLikeDeleteArgs>(args: Prisma.SelectSubset<T, AnswerLikeDeleteArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AnswerLikeUpdateArgs>(args: Prisma.SelectSubset<T, AnswerLikeUpdateArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AnswerLikeDeleteManyArgs>(args?: Prisma.SelectSubset<T, AnswerLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AnswerLikeUpdateManyArgs>(args: Prisma.SelectSubset<T, AnswerLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AnswerLikeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AnswerLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AnswerLikeUpsertArgs>(args: Prisma.SelectSubset<T, AnswerLikeUpsertArgs<ExtArgs>>): Prisma.Prisma__AnswerLikeClient<runtime.Types.Result.GetResult<Prisma.$AnswerLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AnswerLikeCountArgs>(args?: Prisma.Subset<T, AnswerLikeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AnswerLikeCountAggregateOutputType> : number>;
    aggregate<T extends AnswerLikeAggregateArgs>(args: Prisma.Subset<T, AnswerLikeAggregateArgs>): Prisma.PrismaPromise<GetAnswerLikeAggregateType<T>>;
    groupBy<T extends AnswerLikeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AnswerLikeGroupByArgs['orderBy'];
    } : {
        orderBy?: AnswerLikeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AnswerLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AnswerLikeFieldRefs;
}
export interface Prisma__AnswerLikeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    answer<T extends Prisma.ForumAnswerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ForumAnswerDefaultArgs<ExtArgs>>): Prisma.Prisma__ForumAnswerClient<runtime.Types.Result.GetResult<Prisma.$ForumAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AnswerLikeFieldRefs {
    readonly answerId: Prisma.FieldRef<"AnswerLike", 'String'>;
    readonly userId: Prisma.FieldRef<"AnswerLike", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AnswerLike", 'DateTime'>;
}
export type AnswerLikeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where: Prisma.AnswerLikeWhereUniqueInput;
};
export type AnswerLikeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where: Prisma.AnswerLikeWhereUniqueInput;
};
export type AnswerLikeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where?: Prisma.AnswerLikeWhereInput;
    orderBy?: Prisma.AnswerLikeOrderByWithRelationInput | Prisma.AnswerLikeOrderByWithRelationInput[];
    cursor?: Prisma.AnswerLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnswerLikeScalarFieldEnum | Prisma.AnswerLikeScalarFieldEnum[];
};
export type AnswerLikeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where?: Prisma.AnswerLikeWhereInput;
    orderBy?: Prisma.AnswerLikeOrderByWithRelationInput | Prisma.AnswerLikeOrderByWithRelationInput[];
    cursor?: Prisma.AnswerLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnswerLikeScalarFieldEnum | Prisma.AnswerLikeScalarFieldEnum[];
};
export type AnswerLikeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where?: Prisma.AnswerLikeWhereInput;
    orderBy?: Prisma.AnswerLikeOrderByWithRelationInput | Prisma.AnswerLikeOrderByWithRelationInput[];
    cursor?: Prisma.AnswerLikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnswerLikeScalarFieldEnum | Prisma.AnswerLikeScalarFieldEnum[];
};
export type AnswerLikeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnswerLikeCreateInput, Prisma.AnswerLikeUncheckedCreateInput>;
};
export type AnswerLikeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AnswerLikeCreateManyInput | Prisma.AnswerLikeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AnswerLikeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    data: Prisma.AnswerLikeCreateManyInput | Prisma.AnswerLikeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AnswerLikeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AnswerLikeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateInput, Prisma.AnswerLikeUncheckedUpdateInput>;
    where: Prisma.AnswerLikeWhereUniqueInput;
};
export type AnswerLikeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AnswerLikeUpdateManyMutationInput, Prisma.AnswerLikeUncheckedUpdateManyInput>;
    where?: Prisma.AnswerLikeWhereInput;
    limit?: number;
};
export type AnswerLikeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnswerLikeUpdateManyMutationInput, Prisma.AnswerLikeUncheckedUpdateManyInput>;
    where?: Prisma.AnswerLikeWhereInput;
    limit?: number;
    include?: Prisma.AnswerLikeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AnswerLikeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where: Prisma.AnswerLikeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnswerLikeCreateInput, Prisma.AnswerLikeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AnswerLikeUpdateInput, Prisma.AnswerLikeUncheckedUpdateInput>;
};
export type AnswerLikeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
    where: Prisma.AnswerLikeWhereUniqueInput;
};
export type AnswerLikeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnswerLikeWhereInput;
    limit?: number;
};
export type AnswerLikeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerLikeSelect<ExtArgs> | null;
    omit?: Prisma.AnswerLikeOmit<ExtArgs> | null;
    include?: Prisma.AnswerLikeInclude<ExtArgs> | null;
};
