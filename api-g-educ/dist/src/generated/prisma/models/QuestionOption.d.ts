import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionOptionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionOptionPayload>;
export type AggregateQuestionOption = {
    _count: QuestionOptionCountAggregateOutputType | null;
    _avg: QuestionOptionAvgAggregateOutputType | null;
    _sum: QuestionOptionSumAggregateOutputType | null;
    _min: QuestionOptionMinAggregateOutputType | null;
    _max: QuestionOptionMaxAggregateOutputType | null;
};
export type QuestionOptionAvgAggregateOutputType = {
    position: number | null;
};
export type QuestionOptionSumAggregateOutputType = {
    position: number | null;
};
export type QuestionOptionMinAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    label: string | null;
    isCorrect: boolean | null;
    position: number | null;
};
export type QuestionOptionMaxAggregateOutputType = {
    id: string | null;
    questionId: string | null;
    label: string | null;
    isCorrect: boolean | null;
    position: number | null;
};
export type QuestionOptionCountAggregateOutputType = {
    id: number;
    questionId: number;
    label: number;
    isCorrect: number;
    position: number;
    _all: number;
};
export type QuestionOptionAvgAggregateInputType = {
    position?: true;
};
export type QuestionOptionSumAggregateInputType = {
    position?: true;
};
export type QuestionOptionMinAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    isCorrect?: true;
    position?: true;
};
export type QuestionOptionMaxAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    isCorrect?: true;
    position?: true;
};
export type QuestionOptionCountAggregateInputType = {
    id?: true;
    questionId?: true;
    label?: true;
    isCorrect?: true;
    position?: true;
    _all?: true;
};
export type QuestionOptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithRelationInput | Prisma.QuestionOptionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionOptionCountAggregateInputType;
    _avg?: QuestionOptionAvgAggregateInputType;
    _sum?: QuestionOptionSumAggregateInputType;
    _min?: QuestionOptionMinAggregateInputType;
    _max?: QuestionOptionMaxAggregateInputType;
};
export type GetQuestionOptionAggregateType<T extends QuestionOptionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionOption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionOption[P]> : Prisma.GetScalarType<T[P], AggregateQuestionOption[P]>;
};
export type QuestionOptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    orderBy?: Prisma.QuestionOptionOrderByWithAggregationInput | Prisma.QuestionOptionOrderByWithAggregationInput[];
    by: Prisma.QuestionOptionScalarFieldEnum[] | Prisma.QuestionOptionScalarFieldEnum;
    having?: Prisma.QuestionOptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionOptionCountAggregateInputType | true;
    _avg?: QuestionOptionAvgAggregateInputType;
    _sum?: QuestionOptionSumAggregateInputType;
    _min?: QuestionOptionMinAggregateInputType;
    _max?: QuestionOptionMaxAggregateInputType;
};
export type QuestionOptionGroupByOutputType = {
    id: string;
    questionId: string;
    label: string;
    isCorrect: boolean;
    position: number;
    _count: QuestionOptionCountAggregateOutputType | null;
    _avg: QuestionOptionAvgAggregateOutputType | null;
    _sum: QuestionOptionSumAggregateOutputType | null;
    _min: QuestionOptionMinAggregateOutputType | null;
    _max: QuestionOptionMaxAggregateOutputType | null;
};
export type GetQuestionOptionGroupByPayload<T extends QuestionOptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionOptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionOptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionOptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>;
}>>;
export type QuestionOptionWhereInput = {
    AND?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    OR?: Prisma.QuestionOptionWhereInput[];
    NOT?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    id?: Prisma.UuidFilter<"QuestionOption"> | string;
    questionId?: Prisma.UuidFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    position?: Prisma.IntFilter<"QuestionOption"> | number;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    selected?: Prisma.AttemptAnswerOptionListRelationFilter;
};
export type QuestionOptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    question?: Prisma.QuestionOrderByWithRelationInput;
    selected?: Prisma.AttemptAnswerOptionOrderByRelationAggregateInput;
};
export type QuestionOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    OR?: Prisma.QuestionOptionWhereInput[];
    NOT?: Prisma.QuestionOptionWhereInput | Prisma.QuestionOptionWhereInput[];
    questionId?: Prisma.UuidFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    position?: Prisma.IntFilter<"QuestionOption"> | number;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
    selected?: Prisma.AttemptAnswerOptionListRelationFilter;
}, "id">;
export type QuestionOptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.QuestionOptionCountOrderByAggregateInput;
    _avg?: Prisma.QuestionOptionAvgOrderByAggregateInput;
    _max?: Prisma.QuestionOptionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionOptionMinOrderByAggregateInput;
    _sum?: Prisma.QuestionOptionSumOrderByAggregateInput;
};
export type QuestionOptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionOptionScalarWhereWithAggregatesInput | Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionOptionScalarWhereWithAggregatesInput | Prisma.QuestionOptionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"QuestionOption"> | string;
    questionId?: Prisma.UuidWithAggregatesFilter<"QuestionOption"> | string;
    label?: Prisma.StringWithAggregatesFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolWithAggregatesFilter<"QuestionOption"> | boolean;
    position?: Prisma.IntWithAggregatesFilter<"QuestionOption"> | number;
};
export type QuestionOptionCreateInput = {
    id?: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
    question: Prisma.QuestionCreateNestedOneWithoutOptionsInput;
    selected?: Prisma.AttemptAnswerOptionCreateNestedManyWithoutOptionInput;
};
export type QuestionOptionUncheckedCreateInput = {
    id?: string;
    questionId: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
    selected?: Prisma.AttemptAnswerOptionUncheckedCreateNestedManyWithoutOptionInput;
};
export type QuestionOptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    question?: Prisma.QuestionUpdateOneRequiredWithoutOptionsNestedInput;
    selected?: Prisma.AttemptAnswerOptionUpdateManyWithoutOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    selected?: Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutOptionNestedInput;
};
export type QuestionOptionCreateManyInput = {
    id?: string;
    questionId: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
};
export type QuestionOptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionOptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionOptionListRelationFilter = {
    every?: Prisma.QuestionOptionWhereInput;
    some?: Prisma.QuestionOptionWhereInput;
    none?: Prisma.QuestionOptionWhereInput;
};
export type QuestionOptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionOptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionOptionAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type QuestionOptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionOptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    isCorrect?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuestionOptionSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type QuestionOptionScalarRelationFilter = {
    is?: Prisma.QuestionOptionWhereInput;
    isNot?: Prisma.QuestionOptionWhereInput;
};
export type QuestionOptionCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
};
export type QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
};
export type QuestionOptionUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    disconnect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    delete?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    update?: Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
};
export type QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput> | Prisma.QuestionOptionCreateWithoutQuestionInput[] | Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput | Prisma.QuestionOptionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuestionOptionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    disconnect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    delete?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    connect?: Prisma.QuestionOptionWhereUniqueInput | Prisma.QuestionOptionWhereUniqueInput[];
    update?: Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuestionOptionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
};
export type QuestionOptionCreateNestedOneWithoutSelectedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedInput>;
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutSelectedInput;
    connect?: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionUpdateOneRequiredWithoutSelectedNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedInput>;
    connectOrCreate?: Prisma.QuestionOptionCreateOrConnectWithoutSelectedInput;
    upsert?: Prisma.QuestionOptionUpsertWithoutSelectedInput;
    connect?: Prisma.QuestionOptionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionOptionUpdateToOneWithWhereWithoutSelectedInput, Prisma.QuestionOptionUpdateWithoutSelectedInput>, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedInput>;
};
export type QuestionOptionCreateWithoutQuestionInput = {
    id?: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
    selected?: Prisma.AttemptAnswerOptionCreateNestedManyWithoutOptionInput;
};
export type QuestionOptionUncheckedCreateWithoutQuestionInput = {
    id?: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
    selected?: Prisma.AttemptAnswerOptionUncheckedCreateNestedManyWithoutOptionInput;
};
export type QuestionOptionCreateOrConnectWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput>;
};
export type QuestionOptionCreateManyQuestionInputEnvelope = {
    data: Prisma.QuestionOptionCreateManyQuestionInput | Prisma.QuestionOptionCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutQuestionInput, Prisma.QuestionOptionUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutQuestionInput, Prisma.QuestionOptionUncheckedCreateWithoutQuestionInput>;
};
export type QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutQuestionInput, Prisma.QuestionOptionUncheckedUpdateWithoutQuestionInput>;
};
export type QuestionOptionUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.QuestionOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyWithoutQuestionInput>;
};
export type QuestionOptionScalarWhereInput = {
    AND?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
    OR?: Prisma.QuestionOptionScalarWhereInput[];
    NOT?: Prisma.QuestionOptionScalarWhereInput | Prisma.QuestionOptionScalarWhereInput[];
    id?: Prisma.UuidFilter<"QuestionOption"> | string;
    questionId?: Prisma.UuidFilter<"QuestionOption"> | string;
    label?: Prisma.StringFilter<"QuestionOption"> | string;
    isCorrect?: Prisma.BoolFilter<"QuestionOption"> | boolean;
    position?: Prisma.IntFilter<"QuestionOption"> | number;
};
export type QuestionOptionCreateWithoutSelectedInput = {
    id?: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
    question: Prisma.QuestionCreateNestedOneWithoutOptionsInput;
};
export type QuestionOptionUncheckedCreateWithoutSelectedInput = {
    id?: string;
    questionId: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
};
export type QuestionOptionCreateOrConnectWithoutSelectedInput = {
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedInput>;
};
export type QuestionOptionUpsertWithoutSelectedInput = {
    update: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutSelectedInput, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedInput>;
    create: Prisma.XOR<Prisma.QuestionOptionCreateWithoutSelectedInput, Prisma.QuestionOptionUncheckedCreateWithoutSelectedInput>;
    where?: Prisma.QuestionOptionWhereInput;
};
export type QuestionOptionUpdateToOneWithWhereWithoutSelectedInput = {
    where?: Prisma.QuestionOptionWhereInput;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateWithoutSelectedInput, Prisma.QuestionOptionUncheckedUpdateWithoutSelectedInput>;
};
export type QuestionOptionUpdateWithoutSelectedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    question?: Prisma.QuestionUpdateOneRequiredWithoutOptionsNestedInput;
};
export type QuestionOptionUncheckedUpdateWithoutSelectedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questionId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionOptionCreateManyQuestionInput = {
    id?: string;
    label: string;
    isCorrect?: boolean;
    position?: number;
};
export type QuestionOptionUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    selected?: Prisma.AttemptAnswerOptionUpdateManyWithoutOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    selected?: Prisma.AttemptAnswerOptionUncheckedUpdateManyWithoutOptionNestedInput;
};
export type QuestionOptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    isCorrect?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionOptionCountOutputType = {
    selected: number;
};
export type QuestionOptionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    selected?: boolean | QuestionOptionCountOutputTypeCountSelectedArgs;
};
export type QuestionOptionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionCountOutputTypeSelect<ExtArgs> | null;
};
export type QuestionOptionCountOutputTypeCountSelectedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerOptionWhereInput;
};
export type QuestionOptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    isCorrect?: boolean;
    position?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    selected?: boolean | Prisma.QuestionOption$selectedArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    isCorrect?: boolean;
    position?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    isCorrect?: boolean;
    position?: boolean;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionOption"]>;
export type QuestionOptionSelectScalar = {
    id?: boolean;
    questionId?: boolean;
    label?: boolean;
    isCorrect?: boolean;
    position?: boolean;
};
export type QuestionOptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "questionId" | "label" | "isCorrect" | "position", ExtArgs["result"]["questionOption"]>;
export type QuestionOptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
    selected?: boolean | Prisma.QuestionOption$selectedArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionOptionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuestionOptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuestionOptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $QuestionOptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionOption";
    objects: {
        question: Prisma.$QuestionPayload<ExtArgs>;
        selected: Prisma.$AttemptAnswerOptionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        questionId: string;
        label: string;
        isCorrect: boolean;
        position: number;
    }, ExtArgs["result"]["questionOption"]>;
    composites: {};
};
export type QuestionOptionGetPayload<S extends boolean | null | undefined | QuestionOptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload, S>;
export type QuestionOptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionOptionCountAggregateInputType | true;
};
export interface QuestionOptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionOption'];
        meta: {
            name: 'QuestionOption';
        };
    };
    findUnique<T extends QuestionOptionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionOptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionOptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionOptionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionOptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionOptionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionOptionCreateArgs>(args: Prisma.SelectSubset<T, QuestionOptionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionOptionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionOptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionOptionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionOptionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionOptionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionOptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionOptionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionOptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionOptionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionOptionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionOptionClient<runtime.Types.Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionOptionCountArgs>(args?: Prisma.Subset<T, QuestionOptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionOptionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionOptionAggregateArgs>(args: Prisma.Subset<T, QuestionOptionAggregateArgs>): Prisma.PrismaPromise<GetQuestionOptionAggregateType<T>>;
    groupBy<T extends QuestionOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionOptionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionOptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionOptionFieldRefs;
}
export interface Prisma__QuestionOptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    selected<T extends Prisma.QuestionOption$selectedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionOption$selectedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionOptionFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly questionId: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly label: Prisma.FieldRef<"QuestionOption", 'String'>;
    readonly isCorrect: Prisma.FieldRef<"QuestionOption", 'Boolean'>;
    readonly position: Prisma.FieldRef<"QuestionOption", 'Int'>;
}
export type QuestionOptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionOptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionOptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionOptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionCreateInput, Prisma.QuestionOptionUncheckedCreateInput>;
};
export type QuestionOptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionOptionCreateManyInput | Prisma.QuestionOptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionOptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    data: Prisma.QuestionOptionCreateManyInput | Prisma.QuestionOptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionOptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionOptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateInput, Prisma.QuestionOptionUncheckedUpdateInput>;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
};
export type QuestionOptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionOptionUpdateManyMutationInput, Prisma.QuestionOptionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
    include?: Prisma.QuestionOptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionOptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionOptionCreateInput, Prisma.QuestionOptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionOptionUpdateInput, Prisma.QuestionOptionUncheckedUpdateInput>;
};
export type QuestionOptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
    where: Prisma.QuestionOptionWhereUniqueInput;
};
export type QuestionOptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionOptionWhereInput;
    limit?: number;
};
export type QuestionOption$selectedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QuestionOptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionOptionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOptionOmit<ExtArgs> | null;
    include?: Prisma.QuestionOptionInclude<ExtArgs> | null;
};
