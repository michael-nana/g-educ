import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ContributionRatingModel = runtime.Types.Result.DefaultSelection<Prisma.$ContributionRatingPayload>;
export type AggregateContributionRating = {
    _count: ContributionRatingCountAggregateOutputType | null;
    _avg: ContributionRatingAvgAggregateOutputType | null;
    _sum: ContributionRatingSumAggregateOutputType | null;
    _min: ContributionRatingMinAggregateOutputType | null;
    _max: ContributionRatingMaxAggregateOutputType | null;
};
export type ContributionRatingAvgAggregateOutputType = {
    score: number | null;
};
export type ContributionRatingSumAggregateOutputType = {
    score: number | null;
};
export type ContributionRatingMinAggregateOutputType = {
    id: string | null;
    contributionId: string | null;
    raterId: string | null;
    score: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContributionRatingMaxAggregateOutputType = {
    id: string | null;
    contributionId: string | null;
    raterId: string | null;
    score: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContributionRatingCountAggregateOutputType = {
    id: number;
    contributionId: number;
    raterId: number;
    score: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ContributionRatingAvgAggregateInputType = {
    score?: true;
};
export type ContributionRatingSumAggregateInputType = {
    score?: true;
};
export type ContributionRatingMinAggregateInputType = {
    id?: true;
    contributionId?: true;
    raterId?: true;
    score?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContributionRatingMaxAggregateInputType = {
    id?: true;
    contributionId?: true;
    raterId?: true;
    score?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContributionRatingCountAggregateInputType = {
    id?: true;
    contributionId?: true;
    raterId?: true;
    score?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ContributionRatingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContributionRatingWhereInput;
    orderBy?: Prisma.ContributionRatingOrderByWithRelationInput | Prisma.ContributionRatingOrderByWithRelationInput[];
    cursor?: Prisma.ContributionRatingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ContributionRatingCountAggregateInputType;
    _avg?: ContributionRatingAvgAggregateInputType;
    _sum?: ContributionRatingSumAggregateInputType;
    _min?: ContributionRatingMinAggregateInputType;
    _max?: ContributionRatingMaxAggregateInputType;
};
export type GetContributionRatingAggregateType<T extends ContributionRatingAggregateArgs> = {
    [P in keyof T & keyof AggregateContributionRating]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateContributionRating[P]> : Prisma.GetScalarType<T[P], AggregateContributionRating[P]>;
};
export type ContributionRatingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContributionRatingWhereInput;
    orderBy?: Prisma.ContributionRatingOrderByWithAggregationInput | Prisma.ContributionRatingOrderByWithAggregationInput[];
    by: Prisma.ContributionRatingScalarFieldEnum[] | Prisma.ContributionRatingScalarFieldEnum;
    having?: Prisma.ContributionRatingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContributionRatingCountAggregateInputType | true;
    _avg?: ContributionRatingAvgAggregateInputType;
    _sum?: ContributionRatingSumAggregateInputType;
    _min?: ContributionRatingMinAggregateInputType;
    _max?: ContributionRatingMaxAggregateInputType;
};
export type ContributionRatingGroupByOutputType = {
    id: string;
    contributionId: string;
    raterId: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ContributionRatingCountAggregateOutputType | null;
    _avg: ContributionRatingAvgAggregateOutputType | null;
    _sum: ContributionRatingSumAggregateOutputType | null;
    _min: ContributionRatingMinAggregateOutputType | null;
    _max: ContributionRatingMaxAggregateOutputType | null;
};
export type GetContributionRatingGroupByPayload<T extends ContributionRatingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ContributionRatingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ContributionRatingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ContributionRatingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ContributionRatingGroupByOutputType[P]>;
}>>;
export type ContributionRatingWhereInput = {
    AND?: Prisma.ContributionRatingWhereInput | Prisma.ContributionRatingWhereInput[];
    OR?: Prisma.ContributionRatingWhereInput[];
    NOT?: Prisma.ContributionRatingWhereInput | Prisma.ContributionRatingWhereInput[];
    id?: Prisma.UuidFilter<"ContributionRating"> | string;
    contributionId?: Prisma.UuidFilter<"ContributionRating"> | string;
    raterId?: Prisma.UuidFilter<"ContributionRating"> | string;
    score?: Prisma.IntFilter<"ContributionRating"> | number;
    createdAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
    contribution?: Prisma.XOR<Prisma.ContributionScalarRelationFilter, Prisma.ContributionWhereInput>;
    rater?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ContributionRatingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    raterId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    contribution?: Prisma.ContributionOrderByWithRelationInput;
    rater?: Prisma.UserOrderByWithRelationInput;
};
export type ContributionRatingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    contributionId_raterId?: Prisma.ContributionRatingContributionIdRaterIdCompoundUniqueInput;
    AND?: Prisma.ContributionRatingWhereInput | Prisma.ContributionRatingWhereInput[];
    OR?: Prisma.ContributionRatingWhereInput[];
    NOT?: Prisma.ContributionRatingWhereInput | Prisma.ContributionRatingWhereInput[];
    contributionId?: Prisma.UuidFilter<"ContributionRating"> | string;
    raterId?: Prisma.UuidFilter<"ContributionRating"> | string;
    score?: Prisma.IntFilter<"ContributionRating"> | number;
    createdAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
    contribution?: Prisma.XOR<Prisma.ContributionScalarRelationFilter, Prisma.ContributionWhereInput>;
    rater?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "contributionId_raterId">;
export type ContributionRatingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    raterId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ContributionRatingCountOrderByAggregateInput;
    _avg?: Prisma.ContributionRatingAvgOrderByAggregateInput;
    _max?: Prisma.ContributionRatingMaxOrderByAggregateInput;
    _min?: Prisma.ContributionRatingMinOrderByAggregateInput;
    _sum?: Prisma.ContributionRatingSumOrderByAggregateInput;
};
export type ContributionRatingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ContributionRatingScalarWhereWithAggregatesInput | Prisma.ContributionRatingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ContributionRatingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ContributionRatingScalarWhereWithAggregatesInput | Prisma.ContributionRatingScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ContributionRating"> | string;
    contributionId?: Prisma.UuidWithAggregatesFilter<"ContributionRating"> | string;
    raterId?: Prisma.UuidWithAggregatesFilter<"ContributionRating"> | string;
    score?: Prisma.IntWithAggregatesFilter<"ContributionRating"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ContributionRating"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ContributionRating"> | Date | string;
};
export type ContributionRatingCreateInput = {
    id?: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contribution: Prisma.ContributionCreateNestedOneWithoutRatingsInput;
    rater: Prisma.UserCreateNestedOneWithoutContributionRatingsInput;
};
export type ContributionRatingUncheckedCreateInput = {
    id?: string;
    contributionId: string;
    raterId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    contribution?: Prisma.ContributionUpdateOneRequiredWithoutRatingsNestedInput;
    rater?: Prisma.UserUpdateOneRequiredWithoutContributionRatingsNestedInput;
};
export type ContributionRatingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contributionId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingCreateManyInput = {
    id?: string;
    contributionId: string;
    raterId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contributionId?: Prisma.StringFieldUpdateOperationsInput | string;
    raterId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingListRelationFilter = {
    every?: Prisma.ContributionRatingWhereInput;
    some?: Prisma.ContributionRatingWhereInput;
    none?: Prisma.ContributionRatingWhereInput;
};
export type ContributionRatingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ContributionRatingContributionIdRaterIdCompoundUniqueInput = {
    contributionId: string;
    raterId: string;
};
export type ContributionRatingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    raterId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContributionRatingAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type ContributionRatingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    raterId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContributionRatingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    raterId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContributionRatingSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type ContributionRatingCreateNestedManyWithoutRaterInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput> | Prisma.ContributionRatingCreateWithoutRaterInput[] | Prisma.ContributionRatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutRaterInput | Prisma.ContributionRatingCreateOrConnectWithoutRaterInput[];
    createMany?: Prisma.ContributionRatingCreateManyRaterInputEnvelope;
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
};
export type ContributionRatingUncheckedCreateNestedManyWithoutRaterInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput> | Prisma.ContributionRatingCreateWithoutRaterInput[] | Prisma.ContributionRatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutRaterInput | Prisma.ContributionRatingCreateOrConnectWithoutRaterInput[];
    createMany?: Prisma.ContributionRatingCreateManyRaterInputEnvelope;
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
};
export type ContributionRatingUpdateManyWithoutRaterNestedInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput> | Prisma.ContributionRatingCreateWithoutRaterInput[] | Prisma.ContributionRatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutRaterInput | Prisma.ContributionRatingCreateOrConnectWithoutRaterInput[];
    upsert?: Prisma.ContributionRatingUpsertWithWhereUniqueWithoutRaterInput | Prisma.ContributionRatingUpsertWithWhereUniqueWithoutRaterInput[];
    createMany?: Prisma.ContributionRatingCreateManyRaterInputEnvelope;
    set?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    disconnect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    delete?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    update?: Prisma.ContributionRatingUpdateWithWhereUniqueWithoutRaterInput | Prisma.ContributionRatingUpdateWithWhereUniqueWithoutRaterInput[];
    updateMany?: Prisma.ContributionRatingUpdateManyWithWhereWithoutRaterInput | Prisma.ContributionRatingUpdateManyWithWhereWithoutRaterInput[];
    deleteMany?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
};
export type ContributionRatingUncheckedUpdateManyWithoutRaterNestedInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput> | Prisma.ContributionRatingCreateWithoutRaterInput[] | Prisma.ContributionRatingUncheckedCreateWithoutRaterInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutRaterInput | Prisma.ContributionRatingCreateOrConnectWithoutRaterInput[];
    upsert?: Prisma.ContributionRatingUpsertWithWhereUniqueWithoutRaterInput | Prisma.ContributionRatingUpsertWithWhereUniqueWithoutRaterInput[];
    createMany?: Prisma.ContributionRatingCreateManyRaterInputEnvelope;
    set?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    disconnect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    delete?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    update?: Prisma.ContributionRatingUpdateWithWhereUniqueWithoutRaterInput | Prisma.ContributionRatingUpdateWithWhereUniqueWithoutRaterInput[];
    updateMany?: Prisma.ContributionRatingUpdateManyWithWhereWithoutRaterInput | Prisma.ContributionRatingUpdateManyWithWhereWithoutRaterInput[];
    deleteMany?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
};
export type ContributionRatingCreateNestedManyWithoutContributionInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput> | Prisma.ContributionRatingCreateWithoutContributionInput[] | Prisma.ContributionRatingUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutContributionInput | Prisma.ContributionRatingCreateOrConnectWithoutContributionInput[];
    createMany?: Prisma.ContributionRatingCreateManyContributionInputEnvelope;
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
};
export type ContributionRatingUncheckedCreateNestedManyWithoutContributionInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput> | Prisma.ContributionRatingCreateWithoutContributionInput[] | Prisma.ContributionRatingUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutContributionInput | Prisma.ContributionRatingCreateOrConnectWithoutContributionInput[];
    createMany?: Prisma.ContributionRatingCreateManyContributionInputEnvelope;
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
};
export type ContributionRatingUpdateManyWithoutContributionNestedInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput> | Prisma.ContributionRatingCreateWithoutContributionInput[] | Prisma.ContributionRatingUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutContributionInput | Prisma.ContributionRatingCreateOrConnectWithoutContributionInput[];
    upsert?: Prisma.ContributionRatingUpsertWithWhereUniqueWithoutContributionInput | Prisma.ContributionRatingUpsertWithWhereUniqueWithoutContributionInput[];
    createMany?: Prisma.ContributionRatingCreateManyContributionInputEnvelope;
    set?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    disconnect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    delete?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    update?: Prisma.ContributionRatingUpdateWithWhereUniqueWithoutContributionInput | Prisma.ContributionRatingUpdateWithWhereUniqueWithoutContributionInput[];
    updateMany?: Prisma.ContributionRatingUpdateManyWithWhereWithoutContributionInput | Prisma.ContributionRatingUpdateManyWithWhereWithoutContributionInput[];
    deleteMany?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
};
export type ContributionRatingUncheckedUpdateManyWithoutContributionNestedInput = {
    create?: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput> | Prisma.ContributionRatingCreateWithoutContributionInput[] | Prisma.ContributionRatingUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ContributionRatingCreateOrConnectWithoutContributionInput | Prisma.ContributionRatingCreateOrConnectWithoutContributionInput[];
    upsert?: Prisma.ContributionRatingUpsertWithWhereUniqueWithoutContributionInput | Prisma.ContributionRatingUpsertWithWhereUniqueWithoutContributionInput[];
    createMany?: Prisma.ContributionRatingCreateManyContributionInputEnvelope;
    set?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    disconnect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    delete?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    connect?: Prisma.ContributionRatingWhereUniqueInput | Prisma.ContributionRatingWhereUniqueInput[];
    update?: Prisma.ContributionRatingUpdateWithWhereUniqueWithoutContributionInput | Prisma.ContributionRatingUpdateWithWhereUniqueWithoutContributionInput[];
    updateMany?: Prisma.ContributionRatingUpdateManyWithWhereWithoutContributionInput | Prisma.ContributionRatingUpdateManyWithWhereWithoutContributionInput[];
    deleteMany?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
};
export type ContributionRatingCreateWithoutRaterInput = {
    id?: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contribution: Prisma.ContributionCreateNestedOneWithoutRatingsInput;
};
export type ContributionRatingUncheckedCreateWithoutRaterInput = {
    id?: string;
    contributionId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingCreateOrConnectWithoutRaterInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput>;
};
export type ContributionRatingCreateManyRaterInputEnvelope = {
    data: Prisma.ContributionRatingCreateManyRaterInput | Prisma.ContributionRatingCreateManyRaterInput[];
    skipDuplicates?: boolean;
};
export type ContributionRatingUpsertWithWhereUniqueWithoutRaterInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ContributionRatingUpdateWithoutRaterInput, Prisma.ContributionRatingUncheckedUpdateWithoutRaterInput>;
    create: Prisma.XOR<Prisma.ContributionRatingCreateWithoutRaterInput, Prisma.ContributionRatingUncheckedCreateWithoutRaterInput>;
};
export type ContributionRatingUpdateWithWhereUniqueWithoutRaterInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateWithoutRaterInput, Prisma.ContributionRatingUncheckedUpdateWithoutRaterInput>;
};
export type ContributionRatingUpdateManyWithWhereWithoutRaterInput = {
    where: Prisma.ContributionRatingScalarWhereInput;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateManyMutationInput, Prisma.ContributionRatingUncheckedUpdateManyWithoutRaterInput>;
};
export type ContributionRatingScalarWhereInput = {
    AND?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
    OR?: Prisma.ContributionRatingScalarWhereInput[];
    NOT?: Prisma.ContributionRatingScalarWhereInput | Prisma.ContributionRatingScalarWhereInput[];
    id?: Prisma.UuidFilter<"ContributionRating"> | string;
    contributionId?: Prisma.UuidFilter<"ContributionRating"> | string;
    raterId?: Prisma.UuidFilter<"ContributionRating"> | string;
    score?: Prisma.IntFilter<"ContributionRating"> | number;
    createdAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContributionRating"> | Date | string;
};
export type ContributionRatingCreateWithoutContributionInput = {
    id?: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rater: Prisma.UserCreateNestedOneWithoutContributionRatingsInput;
};
export type ContributionRatingUncheckedCreateWithoutContributionInput = {
    id?: string;
    raterId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingCreateOrConnectWithoutContributionInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput>;
};
export type ContributionRatingCreateManyContributionInputEnvelope = {
    data: Prisma.ContributionRatingCreateManyContributionInput | Prisma.ContributionRatingCreateManyContributionInput[];
    skipDuplicates?: boolean;
};
export type ContributionRatingUpsertWithWhereUniqueWithoutContributionInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ContributionRatingUpdateWithoutContributionInput, Prisma.ContributionRatingUncheckedUpdateWithoutContributionInput>;
    create: Prisma.XOR<Prisma.ContributionRatingCreateWithoutContributionInput, Prisma.ContributionRatingUncheckedCreateWithoutContributionInput>;
};
export type ContributionRatingUpdateWithWhereUniqueWithoutContributionInput = {
    where: Prisma.ContributionRatingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateWithoutContributionInput, Prisma.ContributionRatingUncheckedUpdateWithoutContributionInput>;
};
export type ContributionRatingUpdateManyWithWhereWithoutContributionInput = {
    where: Prisma.ContributionRatingScalarWhereInput;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateManyMutationInput, Prisma.ContributionRatingUncheckedUpdateManyWithoutContributionInput>;
};
export type ContributionRatingCreateManyRaterInput = {
    id?: string;
    contributionId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingUpdateWithoutRaterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    contribution?: Prisma.ContributionUpdateOneRequiredWithoutRatingsNestedInput;
};
export type ContributionRatingUncheckedUpdateWithoutRaterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contributionId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingUncheckedUpdateManyWithoutRaterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contributionId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingCreateManyContributionInput = {
    id?: string;
    raterId: string;
    score: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContributionRatingUpdateWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rater?: Prisma.UserUpdateOneRequiredWithoutContributionRatingsNestedInput;
};
export type ContributionRatingUncheckedUpdateWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    raterId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingUncheckedUpdateManyWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    raterId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContributionRatingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contributionId?: boolean;
    raterId?: boolean;
    score?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contributionRating"]>;
export type ContributionRatingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contributionId?: boolean;
    raterId?: boolean;
    score?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contributionRating"]>;
export type ContributionRatingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contributionId?: boolean;
    raterId?: boolean;
    score?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contributionRating"]>;
export type ContributionRatingSelectScalar = {
    id?: boolean;
    contributionId?: boolean;
    raterId?: boolean;
    score?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ContributionRatingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "contributionId" | "raterId" | "score" | "createdAt" | "updatedAt", ExtArgs["result"]["contributionRating"]>;
export type ContributionRatingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ContributionRatingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ContributionRatingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    contribution?: boolean | Prisma.ContributionDefaultArgs<ExtArgs>;
    rater?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ContributionRatingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ContributionRating";
    objects: {
        contribution: Prisma.$ContributionPayload<ExtArgs>;
        rater: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        contributionId: string;
        raterId: string;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["contributionRating"]>;
    composites: {};
};
export type ContributionRatingGetPayload<S extends boolean | null | undefined | ContributionRatingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload, S>;
export type ContributionRatingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ContributionRatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContributionRatingCountAggregateInputType | true;
};
export interface ContributionRatingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ContributionRating'];
        meta: {
            name: 'ContributionRating';
        };
    };
    findUnique<T extends ContributionRatingFindUniqueArgs>(args: Prisma.SelectSubset<T, ContributionRatingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ContributionRatingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ContributionRatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ContributionRatingFindFirstArgs>(args?: Prisma.SelectSubset<T, ContributionRatingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ContributionRatingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ContributionRatingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ContributionRatingFindManyArgs>(args?: Prisma.SelectSubset<T, ContributionRatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ContributionRatingCreateArgs>(args: Prisma.SelectSubset<T, ContributionRatingCreateArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ContributionRatingCreateManyArgs>(args?: Prisma.SelectSubset<T, ContributionRatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ContributionRatingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ContributionRatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ContributionRatingDeleteArgs>(args: Prisma.SelectSubset<T, ContributionRatingDeleteArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ContributionRatingUpdateArgs>(args: Prisma.SelectSubset<T, ContributionRatingUpdateArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ContributionRatingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ContributionRatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ContributionRatingUpdateManyArgs>(args: Prisma.SelectSubset<T, ContributionRatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ContributionRatingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ContributionRatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ContributionRatingUpsertArgs>(args: Prisma.SelectSubset<T, ContributionRatingUpsertArgs<ExtArgs>>): Prisma.Prisma__ContributionRatingClient<runtime.Types.Result.GetResult<Prisma.$ContributionRatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ContributionRatingCountArgs>(args?: Prisma.Subset<T, ContributionRatingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ContributionRatingCountAggregateOutputType> : number>;
    aggregate<T extends ContributionRatingAggregateArgs>(args: Prisma.Subset<T, ContributionRatingAggregateArgs>): Prisma.PrismaPromise<GetContributionRatingAggregateType<T>>;
    groupBy<T extends ContributionRatingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ContributionRatingGroupByArgs['orderBy'];
    } : {
        orderBy?: ContributionRatingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ContributionRatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContributionRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ContributionRatingFieldRefs;
}
export interface Prisma__ContributionRatingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    contribution<T extends Prisma.ContributionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ContributionDefaultArgs<ExtArgs>>): Prisma.Prisma__ContributionClient<runtime.Types.Result.GetResult<Prisma.$ContributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rater<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ContributionRatingFieldRefs {
    readonly id: Prisma.FieldRef<"ContributionRating", 'String'>;
    readonly contributionId: Prisma.FieldRef<"ContributionRating", 'String'>;
    readonly raterId: Prisma.FieldRef<"ContributionRating", 'String'>;
    readonly score: Prisma.FieldRef<"ContributionRating", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ContributionRating", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ContributionRating", 'DateTime'>;
}
export type ContributionRatingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where: Prisma.ContributionRatingWhereUniqueInput;
};
export type ContributionRatingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where: Prisma.ContributionRatingWhereUniqueInput;
};
export type ContributionRatingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where?: Prisma.ContributionRatingWhereInput;
    orderBy?: Prisma.ContributionRatingOrderByWithRelationInput | Prisma.ContributionRatingOrderByWithRelationInput[];
    cursor?: Prisma.ContributionRatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContributionRatingScalarFieldEnum | Prisma.ContributionRatingScalarFieldEnum[];
};
export type ContributionRatingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where?: Prisma.ContributionRatingWhereInput;
    orderBy?: Prisma.ContributionRatingOrderByWithRelationInput | Prisma.ContributionRatingOrderByWithRelationInput[];
    cursor?: Prisma.ContributionRatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContributionRatingScalarFieldEnum | Prisma.ContributionRatingScalarFieldEnum[];
};
export type ContributionRatingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where?: Prisma.ContributionRatingWhereInput;
    orderBy?: Prisma.ContributionRatingOrderByWithRelationInput | Prisma.ContributionRatingOrderByWithRelationInput[];
    cursor?: Prisma.ContributionRatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContributionRatingScalarFieldEnum | Prisma.ContributionRatingScalarFieldEnum[];
};
export type ContributionRatingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContributionRatingCreateInput, Prisma.ContributionRatingUncheckedCreateInput>;
};
export type ContributionRatingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ContributionRatingCreateManyInput | Prisma.ContributionRatingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContributionRatingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    data: Prisma.ContributionRatingCreateManyInput | Prisma.ContributionRatingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ContributionRatingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ContributionRatingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateInput, Prisma.ContributionRatingUncheckedUpdateInput>;
    where: Prisma.ContributionRatingWhereUniqueInput;
};
export type ContributionRatingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ContributionRatingUpdateManyMutationInput, Prisma.ContributionRatingUncheckedUpdateManyInput>;
    where?: Prisma.ContributionRatingWhereInput;
    limit?: number;
};
export type ContributionRatingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContributionRatingUpdateManyMutationInput, Prisma.ContributionRatingUncheckedUpdateManyInput>;
    where?: Prisma.ContributionRatingWhereInput;
    limit?: number;
    include?: Prisma.ContributionRatingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ContributionRatingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where: Prisma.ContributionRatingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContributionRatingCreateInput, Prisma.ContributionRatingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ContributionRatingUpdateInput, Prisma.ContributionRatingUncheckedUpdateInput>;
};
export type ContributionRatingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
    where: Prisma.ContributionRatingWhereUniqueInput;
};
export type ContributionRatingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContributionRatingWhereInput;
    limit?: number;
};
export type ContributionRatingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionRatingSelect<ExtArgs> | null;
    omit?: Prisma.ContributionRatingOmit<ExtArgs> | null;
    include?: Prisma.ContributionRatingInclude<ExtArgs> | null;
};
