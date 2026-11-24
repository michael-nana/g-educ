import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AttemptAnswerOptionModel = runtime.Types.Result.DefaultSelection<Prisma.$AttemptAnswerOptionPayload>;
export type AggregateAttemptAnswerOption = {
    _count: AttemptAnswerOptionCountAggregateOutputType | null;
    _min: AttemptAnswerOptionMinAggregateOutputType | null;
    _max: AttemptAnswerOptionMaxAggregateOutputType | null;
};
export type AttemptAnswerOptionMinAggregateOutputType = {
    attemptAnswerId: string | null;
    optionId: string | null;
};
export type AttemptAnswerOptionMaxAggregateOutputType = {
    attemptAnswerId: string | null;
    optionId: string | null;
};
export type AttemptAnswerOptionCountAggregateOutputType = {
    attemptAnswerId: number;
    optionId: number;
    _all: number;
};
export type AttemptAnswerOptionMinAggregateInputType = {
    attemptAnswerId?: true;
    optionId?: true;
};
export type AttemptAnswerOptionMaxAggregateInputType = {
    attemptAnswerId?: true;
    optionId?: true;
};
export type AttemptAnswerOptionCountAggregateInputType = {
    attemptAnswerId?: true;
    optionId?: true;
    _all?: true;
};
export type AttemptAnswerOptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerOptionWhereInput;
    orderBy?: Prisma.AttemptAnswerOptionOrderByWithRelationInput | Prisma.AttemptAnswerOptionOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttemptAnswerOptionCountAggregateInputType;
    _min?: AttemptAnswerOptionMinAggregateInputType;
    _max?: AttemptAnswerOptionMaxAggregateInputType;
};
export type GetAttemptAnswerOptionAggregateType<T extends AttemptAnswerOptionAggregateArgs> = {
    [P in keyof T & keyof AggregateAttemptAnswerOption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttemptAnswerOption[P]> : Prisma.GetScalarType<T[P], AggregateAttemptAnswerOption[P]>;
};
export type AttemptAnswerOptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerOptionWhereInput;
    orderBy?: Prisma.AttemptAnswerOptionOrderByWithAggregationInput | Prisma.AttemptAnswerOptionOrderByWithAggregationInput[];
    by: Prisma.AttemptAnswerOptionScalarFieldEnum[] | Prisma.AttemptAnswerOptionScalarFieldEnum;
    having?: Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttemptAnswerOptionCountAggregateInputType | true;
    _min?: AttemptAnswerOptionMinAggregateInputType;
    _max?: AttemptAnswerOptionMaxAggregateInputType;
};
export type AttemptAnswerOptionGroupByOutputType = {
    attemptAnswerId: string;
    optionId: string;
    _count: AttemptAnswerOptionCountAggregateOutputType | null;
    _min: AttemptAnswerOptionMinAggregateOutputType | null;
    _max: AttemptAnswerOptionMaxAggregateOutputType | null;
};
export type GetAttemptAnswerOptionGroupByPayload<T extends AttemptAnswerOptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttemptAnswerOptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttemptAnswerOptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttemptAnswerOptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttemptAnswerOptionGroupByOutputType[P]>;
}>>;
export type AttemptAnswerOptionWhereInput = {
    AND?: Prisma.AttemptAnswerOptionWhereInput | Prisma.AttemptAnswerOptionWhereInput[];
    OR?: Prisma.AttemptAnswerOptionWhereInput[];
    NOT?: Prisma.AttemptAnswerOptionWhereInput | Prisma.AttemptAnswerOptionWhereInput[];
    attemptAnswerId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
    optionId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
    attemptAnswer?: Prisma.XOR<Prisma.AttemptAnswerScalarRelationFilter, Prisma.AttemptAnswerWhereInput>;
    option?: Prisma.XOR<Prisma.QuestionOptionScalarRelationFilter, Prisma.QuestionOptionWhereInput>;
};
export type AttemptAnswerOptionOrderByWithRelationInput = {
    attemptAnswerId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    attemptAnswer?: Prisma.AttemptAnswerOrderByWithRelationInput;
    option?: Prisma.QuestionOptionOrderByWithRelationInput;
};
export type AttemptAnswerOptionWhereUniqueInput = Prisma.AtLeast<{
    attemptAnswerId_optionId?: Prisma.AttemptAnswerOptionAttemptAnswerIdOptionIdCompoundUniqueInput;
    AND?: Prisma.AttemptAnswerOptionWhereInput | Prisma.AttemptAnswerOptionWhereInput[];
    OR?: Prisma.AttemptAnswerOptionWhereInput[];
    NOT?: Prisma.AttemptAnswerOptionWhereInput | Prisma.AttemptAnswerOptionWhereInput[];
    attemptAnswerId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
    optionId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
    attemptAnswer?: Prisma.XOR<Prisma.AttemptAnswerScalarRelationFilter, Prisma.AttemptAnswerWhereInput>;
    option?: Prisma.XOR<Prisma.QuestionOptionScalarRelationFilter, Prisma.QuestionOptionWhereInput>;
}, "attemptAnswerId_optionId">;
export type AttemptAnswerOptionOrderByWithAggregationInput = {
    attemptAnswerId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    _count?: Prisma.AttemptAnswerOptionCountOrderByAggregateInput;
    _max?: Prisma.AttemptAnswerOptionMaxOrderByAggregateInput;
    _min?: Prisma.AttemptAnswerOptionMinOrderByAggregateInput;
};
export type AttemptAnswerOptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput | Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput | Prisma.AttemptAnswerOptionScalarWhereWithAggregatesInput[];
    attemptAnswerId?: Prisma.UuidWithAggregatesFilter<"AttemptAnswerOption"> | string;
    optionId?: Prisma.UuidWithAggregatesFilter<"AttemptAnswerOption"> | string;
};
export type AttemptAnswerOptionCreateInput = {
    attemptAnswer: Prisma.AttemptAnswerCreateNestedOneWithoutOptionsInput;
    option: Prisma.QuestionOptionCreateNestedOneWithoutSelectedInput;
};
export type AttemptAnswerOptionUncheckedCreateInput = {
    attemptAnswerId: string;
    optionId: string;
};
export type AttemptAnswerOptionUpdateInput = {
    attemptAnswer?: Prisma.AttemptAnswerUpdateOneRequiredWithoutOptionsNestedInput;
    option?: Prisma.QuestionOptionUpdateOneRequiredWithoutSelectedNestedInput;
};
export type AttemptAnswerOptionUncheckedUpdateInput = {
    attemptAnswerId?: Prisma.StringFieldUpdateOperationsInput | string;
    optionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionCreateManyInput = {
    attemptAnswerId: string;
    optionId: string;
};
export type AttemptAnswerOptionUpdateManyMutationInput = {};
export type AttemptAnswerOptionUncheckedUpdateManyInput = {
    attemptAnswerId?: Prisma.StringFieldUpdateOperationsInput | string;
    optionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionListRelationFilter = {
    every?: Prisma.AttemptAnswerOptionWhereInput;
    some?: Prisma.AttemptAnswerOptionWhereInput;
    none?: Prisma.AttemptAnswerOptionWhereInput;
};
export type AttemptAnswerOptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttemptAnswerOptionAttemptAnswerIdOptionIdCompoundUniqueInput = {
    attemptAnswerId: string;
    optionId: string;
};
export type AttemptAnswerOptionCountOrderByAggregateInput = {
    attemptAnswerId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
};
export type AttemptAnswerOptionMaxOrderByAggregateInput = {
    attemptAnswerId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
};
export type AttemptAnswerOptionMinOrderByAggregateInput = {
    attemptAnswerId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
};
export type AttemptAnswerOptionCreateNestedManyWithoutOptionInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput> | Prisma.AttemptAnswerOptionCreateWithoutOptionInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyOptionInputEnvelope;
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
};
export type AttemptAnswerOptionUncheckedCreateNestedManyWithoutOptionInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput> | Prisma.AttemptAnswerOptionCreateWithoutOptionInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyOptionInputEnvelope;
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
};
export type AttemptAnswerOptionUpdateManyWithoutOptionNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput> | Prisma.AttemptAnswerOptionCreateWithoutOptionInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput[];
    upsert?: Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutOptionInput | Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutOptionInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyOptionInputEnvelope;
    set?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    update?: Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutOptionInput | Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutOptionInput[];
    updateMany?: Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutOptionInput | Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutOptionInput[];
    deleteMany?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
};
export type AttemptAnswerOptionUncheckedUpdateManyWithoutOptionNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput> | Prisma.AttemptAnswerOptionCreateWithoutOptionInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutOptionInput[];
    upsert?: Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutOptionInput | Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutOptionInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyOptionInputEnvelope;
    set?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    update?: Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutOptionInput | Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutOptionInput[];
    updateMany?: Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutOptionInput | Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutOptionInput[];
    deleteMany?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
};
export type AttemptAnswerOptionCreateNestedManyWithoutAttemptAnswerInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput> | Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInputEnvelope;
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
};
export type AttemptAnswerOptionUncheckedCreateNestedManyWithoutAttemptAnswerInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput> | Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInputEnvelope;
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
};
export type AttemptAnswerOptionUpdateManyWithoutAttemptAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput> | Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput[];
    upsert?: Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutAttemptAnswerInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInputEnvelope;
    set?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    update?: Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutAttemptAnswerInput[];
    updateMany?: Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutAttemptAnswerInput[];
    deleteMany?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
};
export type AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput> | Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput[] | Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput[];
    connectOrCreate?: Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput[];
    upsert?: Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpsertWithWhereUniqueWithoutAttemptAnswerInput[];
    createMany?: Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInputEnvelope;
    set?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerOptionWhereUniqueInput | Prisma.AttemptAnswerOptionWhereUniqueInput[];
    update?: Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpdateWithWhereUniqueWithoutAttemptAnswerInput[];
    updateMany?: Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutAttemptAnswerInput | Prisma.AttemptAnswerOptionUpdateManyWithWhereWithoutAttemptAnswerInput[];
    deleteMany?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
};
export type AttemptAnswerOptionCreateWithoutOptionInput = {
    attemptAnswer: Prisma.AttemptAnswerCreateNestedOneWithoutOptionsInput;
};
export type AttemptAnswerOptionUncheckedCreateWithoutOptionInput = {
    attemptAnswerId: string;
};
export type AttemptAnswerOptionCreateOrConnectWithoutOptionInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput>;
};
export type AttemptAnswerOptionCreateManyOptionInputEnvelope = {
    data: Prisma.AttemptAnswerOptionCreateManyOptionInput | Prisma.AttemptAnswerOptionCreateManyOptionInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerOptionUpsertWithWhereUniqueWithoutOptionInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedUpdateWithoutOptionInput>;
    create: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutOptionInput>;
};
export type AttemptAnswerOptionUpdateWithWhereUniqueWithoutOptionInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateWithoutOptionInput, Prisma.AttemptAnswerOptionUncheckedUpdateWithoutOptionInput>;
};
export type AttemptAnswerOptionUpdateManyWithWhereWithoutOptionInput = {
    where: Prisma.AttemptAnswerOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateManyMutationInput, Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutOptionInput>;
};
export type AttemptAnswerOptionScalarWhereInput = {
    AND?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
    OR?: Prisma.AttemptAnswerOptionScalarWhereInput[];
    NOT?: Prisma.AttemptAnswerOptionScalarWhereInput | Prisma.AttemptAnswerOptionScalarWhereInput[];
    attemptAnswerId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
    optionId?: Prisma.UuidFilter<"AttemptAnswerOption"> | string;
};
export type AttemptAnswerOptionCreateWithoutAttemptAnswerInput = {
    option: Prisma.QuestionOptionCreateNestedOneWithoutSelectedInput;
};
export type AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput = {
    optionId: string;
};
export type AttemptAnswerOptionCreateOrConnectWithoutAttemptAnswerInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput>;
};
export type AttemptAnswerOptionCreateManyAttemptAnswerInputEnvelope = {
    data: Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInput | Prisma.AttemptAnswerOptionCreateManyAttemptAnswerInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerOptionUpsertWithWhereUniqueWithoutAttemptAnswerInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedUpdateWithoutAttemptAnswerInput>;
    create: Prisma.XOR<Prisma.AttemptAnswerOptionCreateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedCreateWithoutAttemptAnswerInput>;
};
export type AttemptAnswerOptionUpdateWithWhereUniqueWithoutAttemptAnswerInput = {
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateWithoutAttemptAnswerInput, Prisma.AttemptAnswerOptionUncheckedUpdateWithoutAttemptAnswerInput>;
};
export type AttemptAnswerOptionUpdateManyWithWhereWithoutAttemptAnswerInput = {
    where: Prisma.AttemptAnswerOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateManyMutationInput, Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerInput>;
};
export type AttemptAnswerOptionCreateManyOptionInput = {
    attemptAnswerId: string;
};
export type AttemptAnswerOptionUpdateWithoutOptionInput = {
    attemptAnswer?: Prisma.AttemptAnswerUpdateOneRequiredWithoutOptionsNestedInput;
};
export type AttemptAnswerOptionUncheckedUpdateWithoutOptionInput = {
    attemptAnswerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionUncheckedUpdateManyWithoutOptionInput = {
    attemptAnswerId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionCreateManyAttemptAnswerInput = {
    optionId: string;
};
export type AttemptAnswerOptionUpdateWithoutAttemptAnswerInput = {
    option?: Prisma.QuestionOptionUpdateOneRequiredWithoutSelectedNestedInput;
};
export type AttemptAnswerOptionUncheckedUpdateWithoutAttemptAnswerInput = {
    optionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerInput = {
    optionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AttemptAnswerOptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attemptAnswerId?: boolean;
    optionId?: boolean;
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswerOption"]>;
export type AttemptAnswerOptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attemptAnswerId?: boolean;
    optionId?: boolean;
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswerOption"]>;
export type AttemptAnswerOptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attemptAnswerId?: boolean;
    optionId?: boolean;
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswerOption"]>;
export type AttemptAnswerOptionSelectScalar = {
    attemptAnswerId?: boolean;
    optionId?: boolean;
};
export type AttemptAnswerOptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"attemptAnswerId" | "optionId", ExtArgs["result"]["attemptAnswerOption"]>;
export type AttemptAnswerOptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
};
export type AttemptAnswerOptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
};
export type AttemptAnswerOptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attemptAnswer?: boolean | Prisma.AttemptAnswerDefaultArgs<ExtArgs>;
    option?: boolean | Prisma.QuestionOptionDefaultArgs<ExtArgs>;
};
export type $AttemptAnswerOptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AttemptAnswerOption";
    objects: {
        attemptAnswer: Prisma.$AttemptAnswerPayload<ExtArgs>;
        option: Prisma.$QuestionOptionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        attemptAnswerId: string;
        optionId: string;
    }, ExtArgs["result"]["attemptAnswerOption"]>;
    composites: {};
};
export type AttemptAnswerOptionGetPayload<S extends boolean | null | undefined | AttemptAnswerOptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload, S>;
export type AttemptAnswerOptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttemptAnswerOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttemptAnswerOptionCountAggregateInputType | true;
};
export interface AttemptAnswerOptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AttemptAnswerOption'];
        meta: {
            name: 'AttemptAnswerOption';
        };
    };
    findUnique<T extends AttemptAnswerOptionFindUniqueArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttemptAnswerOptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttemptAnswerOptionFindFirstArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttemptAnswerOptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttemptAnswerOptionFindManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttemptAnswerOptionCreateArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionCreateArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttemptAnswerOptionCreateManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttemptAnswerOptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttemptAnswerOptionDeleteArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionDeleteArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttemptAnswerOptionUpdateArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionUpdateArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttemptAnswerOptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttemptAnswerOptionUpdateManyArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttemptAnswerOptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttemptAnswerOptionUpsertArgs>(args: Prisma.SelectSubset<T, AttemptAnswerOptionUpsertArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerOptionClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttemptAnswerOptionCountArgs>(args?: Prisma.Subset<T, AttemptAnswerOptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttemptAnswerOptionCountAggregateOutputType> : number>;
    aggregate<T extends AttemptAnswerOptionAggregateArgs>(args: Prisma.Subset<T, AttemptAnswerOptionAggregateArgs>): Prisma.PrismaPromise<GetAttemptAnswerOptionAggregateType<T>>;
    groupBy<T extends AttemptAnswerOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttemptAnswerOptionGroupByArgs['orderBy'];
    } : {
        orderBy?: AttemptAnswerOptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttemptAnswerOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttemptAnswerOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttemptAnswerOptionFieldRefs;
}
export interface Prisma__AttemptAnswerOptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    attemptAnswer<T extends Prisma.AttemptAnswerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AttemptAnswerDefaultArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    option<T extends Prisma.QuestionOptionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionOptionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttemptAnswerOptionFieldRefs {
    readonly attemptAnswerId: Prisma.FieldRef<"AttemptAnswerOption", 'String'>;
    readonly optionId: Prisma.FieldRef<"AttemptAnswerOption", 'String'>;
}
export type AttemptAnswerOptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
};
export type AttemptAnswerOptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
};
export type AttemptAnswerOptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerOptionWhereInput;
    orderBy?: Prisma.AttemptAnswerOptionOrderByWithRelationInput | Prisma.AttemptAnswerOptionOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerOptionScalarFieldEnum | Prisma.AttemptAnswerOptionScalarFieldEnum[];
};
export type AttemptAnswerOptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerOptionWhereInput;
    orderBy?: Prisma.AttemptAnswerOptionOrderByWithRelationInput | Prisma.AttemptAnswerOptionOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerOptionScalarFieldEnum | Prisma.AttemptAnswerOptionScalarFieldEnum[];
};
export type AttemptAnswerOptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerOptionWhereInput;
    orderBy?: Prisma.AttemptAnswerOptionOrderByWithRelationInput | Prisma.AttemptAnswerOptionOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerOptionScalarFieldEnum | Prisma.AttemptAnswerOptionScalarFieldEnum[];
};
export type AttemptAnswerOptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionCreateInput, Prisma.AttemptAnswerOptionUncheckedCreateInput>;
};
export type AttemptAnswerOptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttemptAnswerOptionCreateManyInput | Prisma.AttemptAnswerOptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerOptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    data: Prisma.AttemptAnswerOptionCreateManyInput | Prisma.AttemptAnswerOptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttemptAnswerOptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttemptAnswerOptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateInput, Prisma.AttemptAnswerOptionUncheckedUpdateInput>;
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
};
export type AttemptAnswerOptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateManyMutationInput, Prisma.AttemptAnswerOptionUncheckedUpdateManyInput>;
    where?: Prisma.AttemptAnswerOptionWhereInput;
    limit?: number;
};
export type AttemptAnswerOptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateManyMutationInput, Prisma.AttemptAnswerOptionUncheckedUpdateManyInput>;
    where?: Prisma.AttemptAnswerOptionWhereInput;
    limit?: number;
    include?: Prisma.AttemptAnswerOptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttemptAnswerOptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerOptionCreateInput, Prisma.AttemptAnswerOptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttemptAnswerOptionUpdateInput, Prisma.AttemptAnswerOptionUncheckedUpdateInput>;
};
export type AttemptAnswerOptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerOptionWhereUniqueInput;
};
export type AttemptAnswerOptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerOptionWhereInput;
    limit?: number;
};
export type AttemptAnswerOptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerOptionSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOptionOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerOptionInclude<ExtArgs> | null;
};
