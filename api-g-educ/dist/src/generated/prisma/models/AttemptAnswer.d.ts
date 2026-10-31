import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AttemptAnswerModel = runtime.Types.Result.DefaultSelection<Prisma.$AttemptAnswerPayload>;
export type AggregateAttemptAnswer = {
    _count: AttemptAnswerCountAggregateOutputType | null;
    _avg: AttemptAnswerAvgAggregateOutputType | null;
    _sum: AttemptAnswerSumAggregateOutputType | null;
    _min: AttemptAnswerMinAggregateOutputType | null;
    _max: AttemptAnswerMaxAggregateOutputType | null;
};
export type AttemptAnswerAvgAggregateOutputType = {
    pointsAwarded: number | null;
};
export type AttemptAnswerSumAggregateOutputType = {
    pointsAwarded: number | null;
};
export type AttemptAnswerMinAggregateOutputType = {
    id: string | null;
    attemptId: string | null;
    questionId: string | null;
    isCorrect: boolean | null;
    pointsAwarded: number | null;
    answeredAt: Date | null;
};
export type AttemptAnswerMaxAggregateOutputType = {
    id: string | null;
    attemptId: string | null;
    questionId: string | null;
    isCorrect: boolean | null;
    pointsAwarded: number | null;
    answeredAt: Date | null;
};
export type AttemptAnswerCountAggregateOutputType = {
    id: number;
    attemptId: number;
    questionId: number;
    isCorrect: number;
    pointsAwarded: number;
    answeredAt: number;
    _all: number;
};
export type AttemptAnswerAvgAggregateInputType = {
    pointsAwarded?: true;
};
export type AttemptAnswerSumAggregateInputType = {
    pointsAwarded?: true;
};
export type AttemptAnswerMinAggregateInputType = {
    id?: true;
    attemptId?: true;
    questionId?: true;
    isCorrect?: true;
    pointsAwarded?: true;
    answeredAt?: true;
};
export type AttemptAnswerMaxAggregateInputType = {
    id?: true;
    attemptId?: true;
    questionId?: true;
    isCorrect?: true;
    pointsAwarded?: true;
    answeredAt?: true;
};
export type AttemptAnswerCountAggregateInputType = {
    id?: true;
    attemptId?: true;
    questionId?: true;
    isCorrect?: true;
    pointsAwarded?: true;
    answeredAt?: true;
    _all?: true;
};
export type AttemptAnswerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithRelationInput | Prisma.AttemptAnswerOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttemptAnswerCountAggregateInputType;
    _avg?: AttemptAnswerAvgAggregateInputType;
    _sum?: AttemptAnswerSumAggregateInputType;
    _min?: AttemptAnswerMinAggregateInputType;
    _max?: AttemptAnswerMaxAggregateInputType;
};
export type GetAttemptAnswerAggregateType<T extends AttemptAnswerAggregateArgs> = {
    [P in keyof T & keyof AggregateAttemptAnswer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttemptAnswer[P]> : Prisma.GetScalarType<T[P], AggregateAttemptAnswer[P]>;
};
export type AttemptAnswerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithAggregationInput | Prisma.AttemptAnswerOrderByWithAggregationInput[];
    by: Prisma.AttemptAnswerScalarFieldEnum[] | Prisma.AttemptAnswerScalarFieldEnum;
    having?: Prisma.AttemptAnswerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttemptAnswerCountAggregateInputType | true;
    _avg?: AttemptAnswerAvgAggregateInputType;
    _sum?: AttemptAnswerSumAggregateInputType;
    _min?: AttemptAnswerMinAggregateInputType;
    _max?: AttemptAnswerMaxAggregateInputType;
};
export type AttemptAnswerGroupByOutputType = {
    id: string;
    attemptId: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded: number;
    answeredAt: Date;
    _count: AttemptAnswerCountAggregateOutputType | null;
    _avg: AttemptAnswerAvgAggregateOutputType | null;
    _sum: AttemptAnswerSumAggregateOutputType | null;
    _min: AttemptAnswerMinAggregateOutputType | null;
    _max: AttemptAnswerMaxAggregateOutputType | null;
};
export type GetAttemptAnswerGroupByPayload<T extends AttemptAnswerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttemptAnswerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttemptAnswerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttemptAnswerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttemptAnswerGroupByOutputType[P]>;
}>>;
export type AttemptAnswerWhereInput = {
    AND?: Prisma.AttemptAnswerWhereInput | Prisma.AttemptAnswerWhereInput[];
    OR?: Prisma.AttemptAnswerWhereInput[];
    NOT?: Prisma.AttemptAnswerWhereInput | Prisma.AttemptAnswerWhereInput[];
    id?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    attemptId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    questionId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    isCorrect?: Prisma.BoolFilter<"AttemptAnswer"> | boolean;
    pointsAwarded?: Prisma.IntFilter<"AttemptAnswer"> | number;
    answeredAt?: Prisma.DateTimeFilter<"AttemptAnswer"> | Date | string;
    attempt?: Prisma.XOR<Prisma.AttemptScalarRelationFilter, Prisma.AttemptWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    options?: Prisma.AttemptAnswerOptionListRelationFilter;
};
export type AttemptAnswerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    attemptId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
    attempt?: Prisma.AttemptOrderByWithRelationInput;
    question?: Prisma.QuestionOrderByWithRelationInput;
    options?: Prisma.AttemptAnswerOptionOrderByRelationAggregateInput;
};
export type AttemptAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    attemptId_questionId?: Prisma.AttemptAnswerAttemptIdQuestionIdCompoundUniqueInput;
    AND?: Prisma.AttemptAnswerWhereInput | Prisma.AttemptAnswerWhereInput[];
    OR?: Prisma.AttemptAnswerWhereInput[];
    NOT?: Prisma.AttemptAnswerWhereInput | Prisma.AttemptAnswerWhereInput[];
    attemptId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    questionId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    isCorrect?: Prisma.BoolFilter<"AttemptAnswer"> | boolean;
    pointsAwarded?: Prisma.IntFilter<"AttemptAnswer"> | number;
    answeredAt?: Prisma.DateTimeFilter<"AttemptAnswer"> | Date | string;
    attempt?: Prisma.XOR<Prisma.AttemptScalarRelationFilter, Prisma.AttemptWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    options?: Prisma.AttemptAnswerOptionListRelationFilter;
}, "id" | "attemptId_questionId">;
export type AttemptAnswerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    attemptId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
    _count?: Prisma.AttemptAnswerCountOrderByAggregateInput;
    _avg?: Prisma.AttemptAnswerAvgOrderByAggregateInput;
    _max?: Prisma.AttemptAnswerMaxOrderByAggregateInput;
    _min?: Prisma.AttemptAnswerMinOrderByAggregateInput;
    _sum?: Prisma.AttemptAnswerSumOrderByAggregateInput;
};
export type AttemptAnswerScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttemptAnswerScalarWhereWithAggregatesInput | Prisma.AttemptAnswerScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttemptAnswerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttemptAnswerScalarWhereWithAggregatesInput | Prisma.AttemptAnswerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AttemptAnswer"> | string;
    attemptId?: Prisma.UuidWithAggregatesFilter<"AttemptAnswer"> | string;
    questionId?: Prisma.UuidWithAggregatesFilter<"AttemptAnswer"> | string;
    isCorrect?: Prisma.BoolWithAggregatesFilter<"AttemptAnswer"> | boolean;
    pointsAwarded?: Prisma.IntWithAggregatesFilter<"AttemptAnswer"> | number;
    answeredAt?: Prisma.DateTimeWithAggregatesFilter<"AttemptAnswer"> | Date | string;
};
export type AttemptAnswerCreateInput = {
    id?: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    attempt: Prisma.AttemptCreateNestedOneWithoutAnswersInput;
    question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;
    options?: Prisma.AttemptAnswerOptionCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerUncheckedCreateInput = {
    id?: string;
    attemptId: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempt?: Prisma.AttemptUpdateOneRequiredWithoutAnswersNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutAnswersNestedInput;
    options?: Prisma.AttemptAnswerOptionUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerCreateManyInput = {
    id?: string;
    attemptId: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
};
export type AttemptAnswerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptAnswerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptAnswerListRelationFilter = {
    every?: Prisma.AttemptAnswerWhereInput;
    some?: Prisma.AttemptAnswerWhereInput;
    none?: Prisma.AttemptAnswerWhereInput;
};
export type AttemptAnswerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttemptAnswerAttemptIdQuestionIdCompoundUniqueInput = {
    attemptId: string;
    questionId: string;
};
export type AttemptAnswerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attemptId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
};
export type AttemptAnswerAvgOrderByAggregateInput = {
    pointsAwarded?: Prisma.SortOrder;
};
export type AttemptAnswerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attemptId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
};
export type AttemptAnswerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    attemptId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    answeredAt?: Prisma.SortOrder;
};
export type AttemptAnswerSumOrderByAggregateInput = {
    pointsAwarded?: Prisma.SortOrder;
};
export type AttemptAnswerScalarRelationFilter = {
    is?: Prisma.AttemptAnswerWhereInput;
    isNot?: Prisma.AttemptAnswerWhereInput;
};
export type AttemptAnswerCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput> | Prisma.AttemptAnswerCreateWithoutQuestionInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput | Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.AttemptAnswerCreateManyQuestionInputEnvelope;
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
};
export type AttemptAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput> | Prisma.AttemptAnswerCreateWithoutQuestionInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput | Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.AttemptAnswerCreateManyQuestionInputEnvelope;
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
};
export type AttemptAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput> | Prisma.AttemptAnswerCreateWithoutQuestionInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput | Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutQuestionInput | Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.AttemptAnswerCreateManyQuestionInputEnvelope;
    set?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    update?: Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutQuestionInput | Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.AttemptAnswerUpdateManyWithWhereWithoutQuestionInput | Prisma.AttemptAnswerUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
};
export type AttemptAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput> | Prisma.AttemptAnswerCreateWithoutQuestionInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput | Prisma.AttemptAnswerCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutQuestionInput | Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.AttemptAnswerCreateManyQuestionInputEnvelope;
    set?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    update?: Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutQuestionInput | Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.AttemptAnswerUpdateManyWithWhereWithoutQuestionInput | Prisma.AttemptAnswerUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
};
export type AttemptAnswerCreateNestedManyWithoutAttemptInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput> | Prisma.AttemptAnswerCreateWithoutAttemptInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput | Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput[];
    createMany?: Prisma.AttemptAnswerCreateManyAttemptInputEnvelope;
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
};
export type AttemptAnswerUncheckedCreateNestedManyWithoutAttemptInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput> | Prisma.AttemptAnswerCreateWithoutAttemptInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput | Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput[];
    createMany?: Prisma.AttemptAnswerCreateManyAttemptInputEnvelope;
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
};
export type AttemptAnswerUpdateManyWithoutAttemptNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput> | Prisma.AttemptAnswerCreateWithoutAttemptInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput | Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput[];
    upsert?: Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutAttemptInput | Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutAttemptInput[];
    createMany?: Prisma.AttemptAnswerCreateManyAttemptInputEnvelope;
    set?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    update?: Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutAttemptInput | Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutAttemptInput[];
    updateMany?: Prisma.AttemptAnswerUpdateManyWithWhereWithoutAttemptInput | Prisma.AttemptAnswerUpdateManyWithWhereWithoutAttemptInput[];
    deleteMany?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
};
export type AttemptAnswerUncheckedUpdateManyWithoutAttemptNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput> | Prisma.AttemptAnswerCreateWithoutAttemptInput[] | Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput[];
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput | Prisma.AttemptAnswerCreateOrConnectWithoutAttemptInput[];
    upsert?: Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutAttemptInput | Prisma.AttemptAnswerUpsertWithWhereUniqueWithoutAttemptInput[];
    createMany?: Prisma.AttemptAnswerCreateManyAttemptInputEnvelope;
    set?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    disconnect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    delete?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    connect?: Prisma.AttemptAnswerWhereUniqueInput | Prisma.AttemptAnswerWhereUniqueInput[];
    update?: Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutAttemptInput | Prisma.AttemptAnswerUpdateWithWhereUniqueWithoutAttemptInput[];
    updateMany?: Prisma.AttemptAnswerUpdateManyWithWhereWithoutAttemptInput | Prisma.AttemptAnswerUpdateManyWithWhereWithoutAttemptInput[];
    deleteMany?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
};
export type AttemptAnswerCreateNestedOneWithoutOptionsInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutOptionsInput;
    connect?: Prisma.AttemptAnswerWhereUniqueInput;
};
export type AttemptAnswerUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.AttemptAnswerCreateOrConnectWithoutOptionsInput;
    upsert?: Prisma.AttemptAnswerUpsertWithoutOptionsInput;
    connect?: Prisma.AttemptAnswerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AttemptAnswerUpdateToOneWithWhereWithoutOptionsInput, Prisma.AttemptAnswerUpdateWithoutOptionsInput>, Prisma.AttemptAnswerUncheckedUpdateWithoutOptionsInput>;
};
export type AttemptAnswerCreateWithoutQuestionInput = {
    id?: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    attempt: Prisma.AttemptCreateNestedOneWithoutAnswersInput;
    options?: Prisma.AttemptAnswerOptionCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string;
    attemptId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerCreateOrConnectWithoutQuestionInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput>;
};
export type AttemptAnswerCreateManyQuestionInputEnvelope = {
    data: Prisma.AttemptAnswerCreateManyQuestionInput | Prisma.AttemptAnswerCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedCreateWithoutQuestionInput>;
};
export type AttemptAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutQuestionInput, Prisma.AttemptAnswerUncheckedUpdateWithoutQuestionInput>;
};
export type AttemptAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.AttemptAnswerScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateManyMutationInput, Prisma.AttemptAnswerUncheckedUpdateManyWithoutQuestionInput>;
};
export type AttemptAnswerScalarWhereInput = {
    AND?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
    OR?: Prisma.AttemptAnswerScalarWhereInput[];
    NOT?: Prisma.AttemptAnswerScalarWhereInput | Prisma.AttemptAnswerScalarWhereInput[];
    id?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    attemptId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    questionId?: Prisma.UuidFilter<"AttemptAnswer"> | string;
    isCorrect?: Prisma.BoolFilter<"AttemptAnswer"> | boolean;
    pointsAwarded?: Prisma.IntFilter<"AttemptAnswer"> | number;
    answeredAt?: Prisma.DateTimeFilter<"AttemptAnswer"> | Date | string;
};
export type AttemptAnswerCreateWithoutAttemptInput = {
    id?: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;
    options?: Prisma.AttemptAnswerOptionCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerUncheckedCreateWithoutAttemptInput = {
    id?: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedCreateNestedManyWithoutAttemptAnswerInput;
};
export type AttemptAnswerCreateOrConnectWithoutAttemptInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput>;
};
export type AttemptAnswerCreateManyAttemptInputEnvelope = {
    data: Prisma.AttemptAnswerCreateManyAttemptInput | Prisma.AttemptAnswerCreateManyAttemptInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerUpsertWithWhereUniqueWithoutAttemptInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedUpdateWithoutAttemptInput>;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedCreateWithoutAttemptInput>;
};
export type AttemptAnswerUpdateWithWhereUniqueWithoutAttemptInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutAttemptInput, Prisma.AttemptAnswerUncheckedUpdateWithoutAttemptInput>;
};
export type AttemptAnswerUpdateManyWithWhereWithoutAttemptInput = {
    where: Prisma.AttemptAnswerScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateManyMutationInput, Prisma.AttemptAnswerUncheckedUpdateManyWithoutAttemptInput>;
};
export type AttemptAnswerCreateWithoutOptionsInput = {
    id?: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
    attempt: Prisma.AttemptCreateNestedOneWithoutAnswersInput;
    question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;
};
export type AttemptAnswerUncheckedCreateWithoutOptionsInput = {
    id?: string;
    attemptId: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
};
export type AttemptAnswerCreateOrConnectWithoutOptionsInput = {
    where: Prisma.AttemptAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedCreateWithoutOptionsInput>;
};
export type AttemptAnswerUpsertWithoutOptionsInput = {
    update: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedUpdateWithoutOptionsInput>;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedCreateWithoutOptionsInput>;
    where?: Prisma.AttemptAnswerWhereInput;
};
export type AttemptAnswerUpdateToOneWithWhereWithoutOptionsInput = {
    where?: Prisma.AttemptAnswerWhereInput;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateWithoutOptionsInput, Prisma.AttemptAnswerUncheckedUpdateWithoutOptionsInput>;
};
export type AttemptAnswerUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempt?: Prisma.AttemptUpdateOneRequiredWithoutAnswersNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutAnswersNestedInput;
};
export type AttemptAnswerUncheckedUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptAnswerCreateManyQuestionInput = {
    id?: string;
    attemptId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
};
export type AttemptAnswerUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempt?: Prisma.AttemptUpdateOneRequiredWithoutAnswersNestedInput;
    options?: Prisma.AttemptAnswerOptionUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptAnswerCreateManyAttemptInput = {
    id?: string;
    questionId: string;
    isCorrect: boolean;
    pointsAwarded?: number;
    answeredAt?: Date | string;
};
export type AttemptAnswerUpdateWithoutAttemptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    question?: Prisma.QuestionUpdateOneRequiredWithoutAnswersNestedInput;
    options?: Prisma.AttemptAnswerOptionUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerUncheckedUpdateWithoutAttemptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutAttemptAnswerNestedInput;
};
export type AttemptAnswerUncheckedUpdateManyWithoutAttemptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    answeredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptAnswerCountOutputType = {
    options: number;
};
export type AttemptAnswerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | AttemptAnswerCountOutputTypeCountOptionsArgs;
};
export type AttemptAnswerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerCountOutputTypeSelect<ExtArgs> | null;
};
export type AttemptAnswerCountOutputTypeCountOptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerOptionWhereInput;
};
export type AttemptAnswerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    attemptId?: boolean;
    questionId?: boolean;
    isCorrect?: boolean;
    pointsAwarded?: boolean;
    answeredAt?: boolean;
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.AttemptAnswer$optionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AttemptAnswerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswer"]>;
export type AttemptAnswerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    attemptId?: boolean;
    questionId?: boolean;
    isCorrect?: boolean;
    pointsAwarded?: boolean;
    answeredAt?: boolean;
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswer"]>;
export type AttemptAnswerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    attemptId?: boolean;
    questionId?: boolean;
    isCorrect?: boolean;
    pointsAwarded?: boolean;
    answeredAt?: boolean;
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attemptAnswer"]>;
export type AttemptAnswerSelectScalar = {
    id?: boolean;
    attemptId?: boolean;
    questionId?: boolean;
    isCorrect?: boolean;
    pointsAwarded?: boolean;
    answeredAt?: boolean;
};
export type AttemptAnswerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "attemptId" | "questionId" | "isCorrect" | "pointsAwarded" | "answeredAt", ExtArgs["result"]["attemptAnswer"]>;
export type AttemptAnswerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.AttemptAnswer$optionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AttemptAnswerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AttemptAnswerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type AttemptAnswerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attempt?: boolean | Prisma.AttemptDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $AttemptAnswerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AttemptAnswer";
    objects: {
        attempt: Prisma.$AttemptPayload<ExtArgs>;
        question: Prisma.$QuestionPayload<ExtArgs>;
        options: Prisma.$AttemptAnswerOptionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        attemptId: string;
        questionId: string;
        isCorrect: boolean;
        pointsAwarded: number;
        answeredAt: Date;
    }, ExtArgs["result"]["attemptAnswer"]>;
    composites: {};
};
export type AttemptAnswerGetPayload<S extends boolean | null | undefined | AttemptAnswerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload, S>;
export type AttemptAnswerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttemptAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttemptAnswerCountAggregateInputType | true;
};
export interface AttemptAnswerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AttemptAnswer'];
        meta: {
            name: 'AttemptAnswer';
        };
    };
    findUnique<T extends AttemptAnswerFindUniqueArgs>(args: Prisma.SelectSubset<T, AttemptAnswerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttemptAnswerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttemptAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttemptAnswerFindFirstArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttemptAnswerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttemptAnswerFindManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttemptAnswerCreateArgs>(args: Prisma.SelectSubset<T, AttemptAnswerCreateArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttemptAnswerCreateManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttemptAnswerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttemptAnswerDeleteArgs>(args: Prisma.SelectSubset<T, AttemptAnswerDeleteArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttemptAnswerUpdateArgs>(args: Prisma.SelectSubset<T, AttemptAnswerUpdateArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttemptAnswerDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttemptAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttemptAnswerUpdateManyArgs>(args: Prisma.SelectSubset<T, AttemptAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttemptAnswerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttemptAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttemptAnswerUpsertArgs>(args: Prisma.SelectSubset<T, AttemptAnswerUpsertArgs<ExtArgs>>): Prisma.Prisma__AttemptAnswerClient<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttemptAnswerCountArgs>(args?: Prisma.Subset<T, AttemptAnswerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttemptAnswerCountAggregateOutputType> : number>;
    aggregate<T extends AttemptAnswerAggregateArgs>(args: Prisma.Subset<T, AttemptAnswerAggregateArgs>): Prisma.PrismaPromise<GetAttemptAnswerAggregateType<T>>;
    groupBy<T extends AttemptAnswerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttemptAnswerGroupByArgs['orderBy'];
    } : {
        orderBy?: AttemptAnswerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttemptAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttemptAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttemptAnswerFieldRefs;
}
export interface Prisma__AttemptAnswerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    attempt<T extends Prisma.AttemptDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AttemptDefaultArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    options<T extends Prisma.AttemptAnswer$optionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AttemptAnswer$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttemptAnswerFieldRefs {
    readonly id: Prisma.FieldRef<"AttemptAnswer", 'String'>;
    readonly attemptId: Prisma.FieldRef<"AttemptAnswer", 'String'>;
    readonly questionId: Prisma.FieldRef<"AttemptAnswer", 'String'>;
    readonly isCorrect: Prisma.FieldRef<"AttemptAnswer", 'Boolean'>;
    readonly pointsAwarded: Prisma.FieldRef<"AttemptAnswer", 'Int'>;
    readonly answeredAt: Prisma.FieldRef<"AttemptAnswer", 'DateTime'>;
}
export type AttemptAnswerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerWhereUniqueInput;
};
export type AttemptAnswerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerWhereUniqueInput;
};
export type AttemptAnswerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithRelationInput | Prisma.AttemptAnswerOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerScalarFieldEnum | Prisma.AttemptAnswerScalarFieldEnum[];
};
export type AttemptAnswerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithRelationInput | Prisma.AttemptAnswerOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerScalarFieldEnum | Prisma.AttemptAnswerScalarFieldEnum[];
};
export type AttemptAnswerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithRelationInput | Prisma.AttemptAnswerOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerScalarFieldEnum | Prisma.AttemptAnswerScalarFieldEnum[];
};
export type AttemptAnswerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerCreateInput, Prisma.AttemptAnswerUncheckedCreateInput>;
};
export type AttemptAnswerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttemptAnswerCreateManyInput | Prisma.AttemptAnswerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttemptAnswerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    data: Prisma.AttemptAnswerCreateManyInput | Prisma.AttemptAnswerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttemptAnswerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttemptAnswerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateInput, Prisma.AttemptAnswerUncheckedUpdateInput>;
    where: Prisma.AttemptAnswerWhereUniqueInput;
};
export type AttemptAnswerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateManyMutationInput, Prisma.AttemptAnswerUncheckedUpdateManyInput>;
    where?: Prisma.AttemptAnswerWhereInput;
    limit?: number;
};
export type AttemptAnswerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptAnswerUpdateManyMutationInput, Prisma.AttemptAnswerUncheckedUpdateManyInput>;
    where?: Prisma.AttemptAnswerWhereInput;
    limit?: number;
    include?: Prisma.AttemptAnswerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttemptAnswerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptAnswerCreateInput, Prisma.AttemptAnswerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttemptAnswerUpdateInput, Prisma.AttemptAnswerUncheckedUpdateInput>;
};
export type AttemptAnswerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where: Prisma.AttemptAnswerWhereUniqueInput;
};
export type AttemptAnswerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerWhereInput;
    limit?: number;
};
export type AttemptAnswer$optionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AttemptAnswerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
};
