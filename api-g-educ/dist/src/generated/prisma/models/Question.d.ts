import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionPayload>;
export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type QuestionAvgAggregateOutputType = {
    points: number | null;
    position: number | null;
};
export type QuestionSumAggregateOutputType = {
    points: number | null;
    position: number | null;
};
export type QuestionMinAggregateOutputType = {
    id: string | null;
    assessmentId: string | null;
    type: $Enums.QuestionType | null;
    statement: string | null;
    explanation: string | null;
    imageKey: string | null;
    points: number | null;
    position: number | null;
};
export type QuestionMaxAggregateOutputType = {
    id: string | null;
    assessmentId: string | null;
    type: $Enums.QuestionType | null;
    statement: string | null;
    explanation: string | null;
    imageKey: string | null;
    points: number | null;
    position: number | null;
};
export type QuestionCountAggregateOutputType = {
    id: number;
    assessmentId: number;
    type: number;
    statement: number;
    explanation: number;
    imageKey: number;
    points: number;
    position: number;
    _all: number;
};
export type QuestionAvgAggregateInputType = {
    points?: true;
    position?: true;
};
export type QuestionSumAggregateInputType = {
    points?: true;
    position?: true;
};
export type QuestionMinAggregateInputType = {
    id?: true;
    assessmentId?: true;
    type?: true;
    statement?: true;
    explanation?: true;
    imageKey?: true;
    points?: true;
    position?: true;
};
export type QuestionMaxAggregateInputType = {
    id?: true;
    assessmentId?: true;
    type?: true;
    statement?: true;
    explanation?: true;
    imageKey?: true;
    points?: true;
    position?: true;
};
export type QuestionCountAggregateInputType = {
    id?: true;
    assessmentId?: true;
    type?: true;
    statement?: true;
    explanation?: true;
    imageKey?: true;
    points?: true;
    position?: true;
    _all?: true;
};
export type QuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionCountAggregateInputType;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestion[P]> : Prisma.GetScalarType<T[P], AggregateQuestion[P]>;
};
export type QuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithAggregationInput | Prisma.QuestionOrderByWithAggregationInput[];
    by: Prisma.QuestionScalarFieldEnum[] | Prisma.QuestionScalarFieldEnum;
    having?: Prisma.QuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionCountAggregateInputType | true;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type QuestionGroupByOutputType = {
    id: string;
    assessmentId: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation: string | null;
    imageKey: string | null;
    points: number;
    position: number;
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]>;
}>>;
export type QuestionWhereInput = {
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    id?: Prisma.UuidFilter<"Question"> | string;
    assessmentId?: Prisma.UuidFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    statement?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    imageKey?: Prisma.StringNullableFilter<"Question"> | string | null;
    points?: Prisma.IntFilter<"Question"> | number;
    position?: Prisma.IntFilter<"Question"> | number;
    assessment?: Prisma.XOR<Prisma.AssessmentScalarRelationFilter, Prisma.AssessmentWhereInput>;
    options?: Prisma.QuestionOptionListRelationFilter;
    answers?: Prisma.AttemptAnswerListRelationFilter;
};
export type QuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    statement?: Prisma.SortOrder;
    explanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    assessment?: Prisma.AssessmentOrderByWithRelationInput;
    options?: Prisma.QuestionOptionOrderByRelationAggregateInput;
    answers?: Prisma.AttemptAnswerOrderByRelationAggregateInput;
};
export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    assessmentId?: Prisma.UuidFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    statement?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    imageKey?: Prisma.StringNullableFilter<"Question"> | string | null;
    points?: Prisma.IntFilter<"Question"> | number;
    position?: Prisma.IntFilter<"Question"> | number;
    assessment?: Prisma.XOR<Prisma.AssessmentScalarRelationFilter, Prisma.AssessmentWhereInput>;
    options?: Prisma.QuestionOptionListRelationFilter;
    answers?: Prisma.AttemptAnswerListRelationFilter;
}, "id">;
export type QuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    statement?: Prisma.SortOrder;
    explanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.QuestionCountOrderByAggregateInput;
    _avg?: Prisma.QuestionAvgOrderByAggregateInput;
    _max?: Prisma.QuestionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionMinOrderByAggregateInput;
    _sum?: Prisma.QuestionSumOrderByAggregateInput;
};
export type QuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Question"> | string;
    assessmentId?: Prisma.UuidWithAggregatesFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType;
    statement?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    explanation?: Prisma.StringNullableWithAggregatesFilter<"Question"> | string | null;
    imageKey?: Prisma.StringNullableWithAggregatesFilter<"Question"> | string | null;
    points?: Prisma.IntWithAggregatesFilter<"Question"> | number;
    position?: Prisma.IntWithAggregatesFilter<"Question"> | number;
};
export type QuestionCreateInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    assessment: Prisma.AssessmentCreateNestedOneWithoutQuestionsInput;
    options?: Prisma.QuestionOptionCreateNestedManyWithoutQuestionInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateInput = {
    id?: string;
    assessmentId: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    options?: Prisma.QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutQuestionsNestedInput;
    options?: Prisma.QuestionOptionUpdateManyWithoutQuestionNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    options?: Prisma.QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateManyInput = {
    id?: string;
    assessmentId: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
};
export type QuestionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionListRelationFilter = {
    every?: Prisma.QuestionWhereInput;
    some?: Prisma.QuestionWhereInput;
    none?: Prisma.QuestionWhereInput;
};
export type QuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    statement?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    imageKey?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionAvgOrderByAggregateInput = {
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    statement?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    imageKey?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    statement?: Prisma.SortOrder;
    explanation?: Prisma.SortOrder;
    imageKey?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionSumOrderByAggregateInput = {
    points?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionScalarRelationFilter = {
    is?: Prisma.QuestionWhereInput;
    isNot?: Prisma.QuestionWhereInput;
};
export type QuestionCreateNestedManyWithoutAssessmentInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput> | Prisma.QuestionCreateWithoutAssessmentInput[] | Prisma.QuestionUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAssessmentInput | Prisma.QuestionCreateOrConnectWithoutAssessmentInput[];
    createMany?: Prisma.QuestionCreateManyAssessmentInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput> | Prisma.QuestionCreateWithoutAssessmentInput[] | Prisma.QuestionUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAssessmentInput | Prisma.QuestionCreateOrConnectWithoutAssessmentInput[];
    createMany?: Prisma.QuestionCreateManyAssessmentInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUpdateManyWithoutAssessmentNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput> | Prisma.QuestionCreateWithoutAssessmentInput[] | Prisma.QuestionUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAssessmentInput | Prisma.QuestionCreateOrConnectWithoutAssessmentInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutAssessmentInput | Prisma.QuestionUpsertWithWhereUniqueWithoutAssessmentInput[];
    createMany?: Prisma.QuestionCreateManyAssessmentInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutAssessmentInput | Prisma.QuestionUpdateWithWhereUniqueWithoutAssessmentInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutAssessmentInput | Prisma.QuestionUpdateManyWithWhereWithoutAssessmentInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type QuestionUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput> | Prisma.QuestionCreateWithoutAssessmentInput[] | Prisma.QuestionUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAssessmentInput | Prisma.QuestionCreateOrConnectWithoutAssessmentInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutAssessmentInput | Prisma.QuestionUpsertWithWhereUniqueWithoutAssessmentInput[];
    createMany?: Prisma.QuestionCreateManyAssessmentInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutAssessmentInput | Prisma.QuestionUpdateWithWhereUniqueWithoutAssessmentInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutAssessmentInput | Prisma.QuestionUpdateManyWithWhereWithoutAssessmentInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType;
};
export type QuestionCreateNestedOneWithoutOptionsInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutOptionsInput, Prisma.QuestionUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutOptionsInput;
    connect?: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutOptionsInput, Prisma.QuestionUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutOptionsInput;
    upsert?: Prisma.QuestionUpsertWithoutOptionsInput;
    connect?: Prisma.QuestionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionUpdateToOneWithWhereWithoutOptionsInput, Prisma.QuestionUpdateWithoutOptionsInput>, Prisma.QuestionUncheckedUpdateWithoutOptionsInput>;
};
export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.QuestionUpsertWithoutAnswersInput;
    connect?: Prisma.QuestionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionUpdateToOneWithWhereWithoutAnswersInput, Prisma.QuestionUpdateWithoutAnswersInput>, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
};
export type QuestionCreateWithoutAssessmentInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    options?: Prisma.QuestionOptionCreateNestedManyWithoutQuestionInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutAssessmentInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    options?: Prisma.QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutAssessmentInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput>;
};
export type QuestionCreateManyAssessmentInputEnvelope = {
    data: Prisma.QuestionCreateManyAssessmentInput | Prisma.QuestionCreateManyAssessmentInput[];
    skipDuplicates?: boolean;
};
export type QuestionUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: Prisma.QuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutAssessmentInput, Prisma.QuestionUncheckedUpdateWithoutAssessmentInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAssessmentInput, Prisma.QuestionUncheckedCreateWithoutAssessmentInput>;
};
export type QuestionUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutAssessmentInput, Prisma.QuestionUncheckedUpdateWithoutAssessmentInput>;
};
export type QuestionUpdateManyWithWhereWithoutAssessmentInput = {
    where: Prisma.QuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyWithoutAssessmentInput>;
};
export type QuestionScalarWhereInput = {
    AND?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    OR?: Prisma.QuestionScalarWhereInput[];
    NOT?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    id?: Prisma.UuidFilter<"Question"> | string;
    assessmentId?: Prisma.UuidFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    statement?: Prisma.StringFilter<"Question"> | string;
    explanation?: Prisma.StringNullableFilter<"Question"> | string | null;
    imageKey?: Prisma.StringNullableFilter<"Question"> | string | null;
    points?: Prisma.IntFilter<"Question"> | number;
    position?: Prisma.IntFilter<"Question"> | number;
};
export type QuestionCreateWithoutOptionsInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    assessment: Prisma.AssessmentCreateNestedOneWithoutQuestionsInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutOptionsInput = {
    id?: string;
    assessmentId: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutOptionsInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutOptionsInput, Prisma.QuestionUncheckedCreateWithoutOptionsInput>;
};
export type QuestionUpsertWithoutOptionsInput = {
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutOptionsInput, Prisma.QuestionUncheckedUpdateWithoutOptionsInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutOptionsInput, Prisma.QuestionUncheckedCreateWithoutOptionsInput>;
    where?: Prisma.QuestionWhereInput;
};
export type QuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: Prisma.QuestionWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutOptionsInput, Prisma.QuestionUncheckedUpdateWithoutOptionsInput>;
};
export type QuestionUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutQuestionsNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateWithoutAnswersInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    assessment: Prisma.AssessmentCreateNestedOneWithoutQuestionsInput;
    options?: Prisma.QuestionOptionCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: string;
    assessmentId: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
    options?: Prisma.QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
};
export type QuestionUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutAnswersInput, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.QuestionWhereInput;
};
export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.QuestionWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutAnswersInput, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
};
export type QuestionUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutQuestionsNestedInput;
    options?: Prisma.QuestionOptionUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    options?: Prisma.QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateManyAssessmentInput = {
    id?: string;
    type: $Enums.QuestionType;
    statement: string;
    explanation?: string | null;
    imageKey?: string | null;
    points?: number;
    position?: number;
};
export type QuestionUpdateWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    options?: Prisma.QuestionOptionUpdateManyWithoutQuestionNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    options?: Prisma.QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateManyWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    statement?: Prisma.StringFieldUpdateOperationsInput | string;
    explanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionCountOutputType = {
    options: number;
    answers: number;
};
export type QuestionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | QuestionCountOutputTypeCountOptionsArgs;
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs;
};
export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionCountOutputTypeSelect<ExtArgs> | null;
};
export type QuestionCountOutputTypeCountOptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
};
export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerWhereInput;
};
export type QuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assessmentId?: boolean;
    type?: boolean;
    statement?: boolean;
    explanation?: boolean;
    imageKey?: boolean;
    points?: boolean;
    position?: boolean;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.Question$optionsArgs<ExtArgs>;
    answers?: boolean | Prisma.Question$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assessmentId?: boolean;
    type?: boolean;
    statement?: boolean;
    explanation?: boolean;
    imageKey?: boolean;
    points?: boolean;
    position?: boolean;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assessmentId?: boolean;
    type?: boolean;
    statement?: boolean;
    explanation?: boolean;
    imageKey?: boolean;
    points?: boolean;
    position?: boolean;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectScalar = {
    id?: boolean;
    assessmentId?: boolean;
    type?: boolean;
    statement?: boolean;
    explanation?: boolean;
    imageKey?: boolean;
    points?: boolean;
    position?: boolean;
};
export type QuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "assessmentId" | "type" | "statement" | "explanation" | "imageKey" | "points" | "position", ExtArgs["result"]["question"]>;
export type QuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.Question$optionsArgs<ExtArgs>;
    answers?: boolean | Prisma.Question$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
};
export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
};
export type $QuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Question";
    objects: {
        assessment: Prisma.$AssessmentPayload<ExtArgs>;
        options: Prisma.$QuestionOptionPayload<ExtArgs>[];
        answers: Prisma.$AttemptAnswerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        assessmentId: string;
        type: $Enums.QuestionType;
        statement: string;
        explanation: string | null;
        imageKey: string | null;
        points: number;
        position: number;
    }, ExtArgs["result"]["question"]>;
    composites: {};
};
export type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionPayload, S>;
export type QuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionCountAggregateInputType | true;
};
export interface QuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Question'];
        meta: {
            name: 'Question';
        };
    };
    findUnique<T extends QuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionCreateArgs>(args: Prisma.SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionCountArgs>(args?: Prisma.Subset<T, QuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionAggregateArgs>(args: Prisma.Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>;
    groupBy<T extends QuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionFieldRefs;
}
export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assessment<T extends Prisma.AssessmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssessmentDefaultArgs<ExtArgs>>): Prisma.Prisma__AssessmentClient<runtime.Types.Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    options<T extends Prisma.Question$optionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Question$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    answers<T extends Prisma.Question$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionFieldRefs {
    readonly id: Prisma.FieldRef<"Question", 'String'>;
    readonly assessmentId: Prisma.FieldRef<"Question", 'String'>;
    readonly type: Prisma.FieldRef<"Question", 'QuestionType'>;
    readonly statement: Prisma.FieldRef<"Question", 'String'>;
    readonly explanation: Prisma.FieldRef<"Question", 'String'>;
    readonly imageKey: Prisma.FieldRef<"Question", 'String'>;
    readonly points: Prisma.FieldRef<"Question", 'Int'>;
    readonly position: Prisma.FieldRef<"Question", 'Int'>;
}
export type QuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
};
export type QuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
    include?: Prisma.QuestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
};
export type QuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type Question$optionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionOptionScalarFieldEnum | Prisma.QuestionOptionScalarFieldEnum[];
};
export type Question$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
};
