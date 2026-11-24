import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClassModel = runtime.Types.Result.DefaultSelection<Prisma.$ClassPayload>;
export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null;
    _avg: ClassAvgAggregateOutputType | null;
    _sum: ClassSumAggregateOutputType | null;
    _min: ClassMinAggregateOutputType | null;
    _max: ClassMaxAggregateOutputType | null;
};
export type ClassAvgAggregateOutputType = {
    position: number | null;
};
export type ClassSumAggregateOutputType = {
    position: number | null;
};
export type ClassMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    label: string | null;
    cycle: $Enums.SchoolCycle | null;
    level: $Enums.ClassLevel | null;
    series: $Enums.ClassSeries | null;
    position: number | null;
};
export type ClassMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    label: string | null;
    cycle: $Enums.SchoolCycle | null;
    level: $Enums.ClassLevel | null;
    series: $Enums.ClassSeries | null;
    position: number | null;
};
export type ClassCountAggregateOutputType = {
    id: number;
    code: number;
    label: number;
    cycle: number;
    level: number;
    series: number;
    position: number;
    _all: number;
};
export type ClassAvgAggregateInputType = {
    position?: true;
};
export type ClassSumAggregateInputType = {
    position?: true;
};
export type ClassMinAggregateInputType = {
    id?: true;
    code?: true;
    label?: true;
    cycle?: true;
    level?: true;
    series?: true;
    position?: true;
};
export type ClassMaxAggregateInputType = {
    id?: true;
    code?: true;
    label?: true;
    cycle?: true;
    level?: true;
    series?: true;
    position?: true;
};
export type ClassCountAggregateInputType = {
    id?: true;
    code?: true;
    label?: true;
    cycle?: true;
    level?: true;
    series?: true;
    position?: true;
    _all?: true;
};
export type ClassAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithRelationInput | Prisma.ClassOrderByWithRelationInput[];
    cursor?: Prisma.ClassWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClassCountAggregateInputType;
    _avg?: ClassAvgAggregateInputType;
    _sum?: ClassSumAggregateInputType;
    _min?: ClassMinAggregateInputType;
    _max?: ClassMaxAggregateInputType;
};
export type GetClassAggregateType<T extends ClassAggregateArgs> = {
    [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClass[P]> : Prisma.GetScalarType<T[P], AggregateClass[P]>;
};
export type ClassGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithAggregationInput | Prisma.ClassOrderByWithAggregationInput[];
    by: Prisma.ClassScalarFieldEnum[] | Prisma.ClassScalarFieldEnum;
    having?: Prisma.ClassScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClassCountAggregateInputType | true;
    _avg?: ClassAvgAggregateInputType;
    _sum?: ClassSumAggregateInputType;
    _min?: ClassMinAggregateInputType;
    _max?: ClassMaxAggregateInputType;
};
export type ClassGroupByOutputType = {
    id: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series: $Enums.ClassSeries | null;
    position: number;
    _count: ClassCountAggregateOutputType | null;
    _avg: ClassAvgAggregateOutputType | null;
    _sum: ClassSumAggregateOutputType | null;
    _min: ClassMinAggregateOutputType | null;
    _max: ClassMaxAggregateOutputType | null;
};
export type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClassGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClassGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClassGroupByOutputType[P]>;
}>>;
export type ClassWhereInput = {
    AND?: Prisma.ClassWhereInput | Prisma.ClassWhereInput[];
    OR?: Prisma.ClassWhereInput[];
    NOT?: Prisma.ClassWhereInput | Prisma.ClassWhereInput[];
    id?: Prisma.UuidFilter<"Class"> | string;
    code?: Prisma.StringFilter<"Class"> | string;
    label?: Prisma.StringFilter<"Class"> | string;
    cycle?: Prisma.EnumSchoolCycleFilter<"Class"> | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFilter<"Class"> | $Enums.ClassLevel;
    series?: Prisma.EnumClassSeriesNullableFilter<"Class"> | $Enums.ClassSeries | null;
    position?: Prisma.IntFilter<"Class"> | number;
    students?: Prisma.StudentProfileListRelationFilter;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classSubjects?: Prisma.ClassSubjectListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    contributions?: Prisma.ContributionListRelationFilter;
    forumThreads?: Prisma.ForumThreadListRelationFilter;
    requestsFrom?: Prisma.ClassChangeRequestListRelationFilter;
    requestsTo?: Prisma.ClassChangeRequestListRelationFilter;
};
export type ClassOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    series?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    students?: Prisma.StudentProfileOrderByRelationAggregateInput;
    enrollments?: Prisma.ClassEnrollmentOrderByRelationAggregateInput;
    classSubjects?: Prisma.ClassSubjectOrderByRelationAggregateInput;
    events?: Prisma.EventOrderByRelationAggregateInput;
    contributions?: Prisma.ContributionOrderByRelationAggregateInput;
    forumThreads?: Prisma.ForumThreadOrderByRelationAggregateInput;
    requestsFrom?: Prisma.ClassChangeRequestOrderByRelationAggregateInput;
    requestsTo?: Prisma.ClassChangeRequestOrderByRelationAggregateInput;
};
export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    position?: number;
    AND?: Prisma.ClassWhereInput | Prisma.ClassWhereInput[];
    OR?: Prisma.ClassWhereInput[];
    NOT?: Prisma.ClassWhereInput | Prisma.ClassWhereInput[];
    label?: Prisma.StringFilter<"Class"> | string;
    cycle?: Prisma.EnumSchoolCycleFilter<"Class"> | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFilter<"Class"> | $Enums.ClassLevel;
    series?: Prisma.EnumClassSeriesNullableFilter<"Class"> | $Enums.ClassSeries | null;
    students?: Prisma.StudentProfileListRelationFilter;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classSubjects?: Prisma.ClassSubjectListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    contributions?: Prisma.ContributionListRelationFilter;
    forumThreads?: Prisma.ForumThreadListRelationFilter;
    requestsFrom?: Prisma.ClassChangeRequestListRelationFilter;
    requestsTo?: Prisma.ClassChangeRequestListRelationFilter;
}, "id" | "code" | "position">;
export type ClassOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    series?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.ClassCountOrderByAggregateInput;
    _avg?: Prisma.ClassAvgOrderByAggregateInput;
    _max?: Prisma.ClassMaxOrderByAggregateInput;
    _min?: Prisma.ClassMinOrderByAggregateInput;
    _sum?: Prisma.ClassSumOrderByAggregateInput;
};
export type ClassScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClassScalarWhereWithAggregatesInput | Prisma.ClassScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClassScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClassScalarWhereWithAggregatesInput | Prisma.ClassScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Class"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Class"> | string;
    label?: Prisma.StringWithAggregatesFilter<"Class"> | string;
    cycle?: Prisma.EnumSchoolCycleWithAggregatesFilter<"Class"> | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelWithAggregatesFilter<"Class"> | $Enums.ClassLevel;
    series?: Prisma.EnumClassSeriesNullableWithAggregatesFilter<"Class"> | $Enums.ClassSeries | null;
    position?: Prisma.IntWithAggregatesFilter<"Class"> | number;
};
export type ClassCreateInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateManyInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
};
export type ClassUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ClassUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ClassCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    series?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ClassAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type ClassMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    series?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ClassMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    cycle?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    series?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ClassSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type ClassScalarRelationFilter = {
    is?: Prisma.ClassWhereInput;
    isNot?: Prisma.ClassWhereInput;
};
export type EnumSchoolCycleFieldUpdateOperationsInput = {
    set?: $Enums.SchoolCycle;
};
export type EnumClassLevelFieldUpdateOperationsInput = {
    set?: $Enums.ClassLevel;
};
export type NullableEnumClassSeriesFieldUpdateOperationsInput = {
    set?: $Enums.ClassSeries | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ClassCreateNestedOneWithoutClassSubjectsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutClassSubjectsInput, Prisma.ClassUncheckedCreateWithoutClassSubjectsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutClassSubjectsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutClassSubjectsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutClassSubjectsInput, Prisma.ClassUncheckedCreateWithoutClassSubjectsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutClassSubjectsInput;
    upsert?: Prisma.ClassUpsertWithoutClassSubjectsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutClassSubjectsInput, Prisma.ClassUpdateWithoutClassSubjectsInput>, Prisma.ClassUncheckedUpdateWithoutClassSubjectsInput>;
};
export type ClassCreateNestedOneWithoutStudentsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutStudentsInput, Prisma.ClassUncheckedCreateWithoutStudentsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutStudentsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutStudentsInput, Prisma.ClassUncheckedCreateWithoutStudentsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutStudentsInput;
    upsert?: Prisma.ClassUpsertWithoutStudentsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutStudentsInput, Prisma.ClassUpdateWithoutStudentsInput>, Prisma.ClassUncheckedUpdateWithoutStudentsInput>;
};
export type ClassCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutEnrollmentsInput, Prisma.ClassUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutEnrollmentsInput, Prisma.ClassUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.ClassUpsertWithoutEnrollmentsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.ClassUpdateWithoutEnrollmentsInput>, Prisma.ClassUncheckedUpdateWithoutEnrollmentsInput>;
};
export type ClassCreateNestedOneWithoutRequestsFromInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutRequestsFromInput, Prisma.ClassUncheckedCreateWithoutRequestsFromInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutRequestsFromInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassCreateNestedOneWithoutRequestsToInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutRequestsToInput, Prisma.ClassUncheckedCreateWithoutRequestsToInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutRequestsToInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutRequestsFromNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutRequestsFromInput, Prisma.ClassUncheckedCreateWithoutRequestsFromInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutRequestsFromInput;
    upsert?: Prisma.ClassUpsertWithoutRequestsFromInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutRequestsFromInput, Prisma.ClassUpdateWithoutRequestsFromInput>, Prisma.ClassUncheckedUpdateWithoutRequestsFromInput>;
};
export type ClassUpdateOneRequiredWithoutRequestsToNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutRequestsToInput, Prisma.ClassUncheckedCreateWithoutRequestsToInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutRequestsToInput;
    upsert?: Prisma.ClassUpsertWithoutRequestsToInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutRequestsToInput, Prisma.ClassUpdateWithoutRequestsToInput>, Prisma.ClassUncheckedUpdateWithoutRequestsToInput>;
};
export type ClassCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutEventsInput, Prisma.ClassUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutEventsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutEventsInput, Prisma.ClassUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.ClassUpsertWithoutEventsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutEventsInput, Prisma.ClassUpdateWithoutEventsInput>, Prisma.ClassUncheckedUpdateWithoutEventsInput>;
};
export type ClassCreateNestedOneWithoutContributionsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutContributionsInput, Prisma.ClassUncheckedCreateWithoutContributionsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutContributionsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutContributionsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutContributionsInput, Prisma.ClassUncheckedCreateWithoutContributionsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutContributionsInput;
    upsert?: Prisma.ClassUpsertWithoutContributionsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutContributionsInput, Prisma.ClassUpdateWithoutContributionsInput>, Prisma.ClassUncheckedUpdateWithoutContributionsInput>;
};
export type ClassCreateNestedOneWithoutForumThreadsInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutForumThreadsInput, Prisma.ClassUncheckedCreateWithoutForumThreadsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutForumThreadsInput;
    connect?: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateOneRequiredWithoutForumThreadsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassCreateWithoutForumThreadsInput, Prisma.ClassUncheckedCreateWithoutForumThreadsInput>;
    connectOrCreate?: Prisma.ClassCreateOrConnectWithoutForumThreadsInput;
    upsert?: Prisma.ClassUpsertWithoutForumThreadsInput;
    connect?: Prisma.ClassWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassUpdateToOneWithWhereWithoutForumThreadsInput, Prisma.ClassUpdateWithoutForumThreadsInput>, Prisma.ClassUncheckedUpdateWithoutForumThreadsInput>;
};
export type ClassCreateWithoutClassSubjectsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutClassSubjectsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutClassSubjectsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutClassSubjectsInput, Prisma.ClassUncheckedCreateWithoutClassSubjectsInput>;
};
export type ClassUpsertWithoutClassSubjectsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutClassSubjectsInput, Prisma.ClassUncheckedUpdateWithoutClassSubjectsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutClassSubjectsInput, Prisma.ClassUncheckedCreateWithoutClassSubjectsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutClassSubjectsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutClassSubjectsInput, Prisma.ClassUncheckedUpdateWithoutClassSubjectsInput>;
};
export type ClassUpdateWithoutClassSubjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutClassSubjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateWithoutStudentsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutStudentsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutStudentsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutStudentsInput, Prisma.ClassUncheckedCreateWithoutStudentsInput>;
};
export type ClassUpsertWithoutStudentsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutStudentsInput, Prisma.ClassUncheckedUpdateWithoutStudentsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutStudentsInput, Prisma.ClassUncheckedCreateWithoutStudentsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutStudentsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutStudentsInput, Prisma.ClassUncheckedUpdateWithoutStudentsInput>;
};
export type ClassUpdateWithoutStudentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutStudentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateWithoutEnrollmentsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutEnrollmentsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutEnrollmentsInput, Prisma.ClassUncheckedCreateWithoutEnrollmentsInput>;
};
export type ClassUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutEnrollmentsInput, Prisma.ClassUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutEnrollmentsInput, Prisma.ClassUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutEnrollmentsInput, Prisma.ClassUncheckedUpdateWithoutEnrollmentsInput>;
};
export type ClassUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateWithoutRequestsFromInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutRequestsFromInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutRequestsFromInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutRequestsFromInput, Prisma.ClassUncheckedCreateWithoutRequestsFromInput>;
};
export type ClassCreateWithoutRequestsToInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
};
export type ClassUncheckedCreateWithoutRequestsToInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
};
export type ClassCreateOrConnectWithoutRequestsToInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutRequestsToInput, Prisma.ClassUncheckedCreateWithoutRequestsToInput>;
};
export type ClassUpsertWithoutRequestsFromInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutRequestsFromInput, Prisma.ClassUncheckedUpdateWithoutRequestsFromInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutRequestsFromInput, Prisma.ClassUncheckedCreateWithoutRequestsFromInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutRequestsFromInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutRequestsFromInput, Prisma.ClassUncheckedUpdateWithoutRequestsFromInput>;
};
export type ClassUpdateWithoutRequestsFromInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutRequestsFromInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassUpsertWithoutRequestsToInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutRequestsToInput, Prisma.ClassUncheckedUpdateWithoutRequestsToInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutRequestsToInput, Prisma.ClassUncheckedCreateWithoutRequestsToInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutRequestsToInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutRequestsToInput, Prisma.ClassUncheckedUpdateWithoutRequestsToInput>;
};
export type ClassUpdateWithoutRequestsToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
};
export type ClassUncheckedUpdateWithoutRequestsToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
};
export type ClassCreateWithoutEventsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutEventsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutEventsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutEventsInput, Prisma.ClassUncheckedCreateWithoutEventsInput>;
};
export type ClassUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutEventsInput, Prisma.ClassUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutEventsInput, Prisma.ClassUncheckedCreateWithoutEventsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutEventsInput, Prisma.ClassUncheckedUpdateWithoutEventsInput>;
};
export type ClassUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateWithoutContributionsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutContributionsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutContributionsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutContributionsInput, Prisma.ClassUncheckedCreateWithoutContributionsInput>;
};
export type ClassUpsertWithoutContributionsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutContributionsInput, Prisma.ClassUncheckedUpdateWithoutContributionsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutContributionsInput, Prisma.ClassUncheckedCreateWithoutContributionsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutContributionsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutContributionsInput, Prisma.ClassUncheckedUpdateWithoutContributionsInput>;
};
export type ClassUpdateWithoutContributionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutContributionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCreateWithoutForumThreadsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectCreateNestedManyWithoutClassInput;
    events?: Prisma.EventCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestCreateNestedManyWithoutToClassInput;
};
export type ClassUncheckedCreateWithoutForumThreadsInput = {
    id?: string;
    code: string;
    label: string;
    cycle: $Enums.SchoolCycle;
    level: $Enums.ClassLevel;
    series?: $Enums.ClassSeries | null;
    position: number;
    students?: Prisma.StudentProfileUncheckedCreateNestedManyWithoutClassInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput;
    classSubjects?: Prisma.ClassSubjectUncheckedCreateNestedManyWithoutClassInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutClassInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput;
};
export type ClassCreateOrConnectWithoutForumThreadsInput = {
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateWithoutForumThreadsInput, Prisma.ClassUncheckedCreateWithoutForumThreadsInput>;
};
export type ClassUpsertWithoutForumThreadsInput = {
    update: Prisma.XOR<Prisma.ClassUpdateWithoutForumThreadsInput, Prisma.ClassUncheckedUpdateWithoutForumThreadsInput>;
    create: Prisma.XOR<Prisma.ClassCreateWithoutForumThreadsInput, Prisma.ClassUncheckedCreateWithoutForumThreadsInput>;
    where?: Prisma.ClassWhereInput;
};
export type ClassUpdateToOneWithWhereWithoutForumThreadsInput = {
    where?: Prisma.ClassWhereInput;
    data: Prisma.XOR<Prisma.ClassUpdateWithoutForumThreadsInput, Prisma.ClassUncheckedUpdateWithoutForumThreadsInput>;
};
export type ClassUpdateWithoutForumThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUpdateManyWithoutToClassNestedInput;
};
export type ClassUncheckedUpdateWithoutForumThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    cycle?: Prisma.EnumSchoolCycleFieldUpdateOperationsInput | $Enums.SchoolCycle;
    level?: Prisma.EnumClassLevelFieldUpdateOperationsInput | $Enums.ClassLevel;
    series?: Prisma.NullableEnumClassSeriesFieldUpdateOperationsInput | $Enums.ClassSeries | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    students?: Prisma.StudentProfileUncheckedUpdateManyWithoutClassNestedInput;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput;
    classSubjects?: Prisma.ClassSubjectUncheckedUpdateManyWithoutClassNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutClassNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassNestedInput;
    requestsFrom?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput;
    requestsTo?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput;
};
export type ClassCountOutputType = {
    students: number;
    enrollments: number;
    classSubjects: number;
    events: number;
    contributions: number;
    forumThreads: number;
    requestsFrom: number;
    requestsTo: number;
};
export type ClassCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    students?: boolean | ClassCountOutputTypeCountStudentsArgs;
    enrollments?: boolean | ClassCountOutputTypeCountEnrollmentsArgs;
    classSubjects?: boolean | ClassCountOutputTypeCountClassSubjectsArgs;
    events?: boolean | ClassCountOutputTypeCountEventsArgs;
    contributions?: boolean | ClassCountOutputTypeCountContributionsArgs;
    forumThreads?: boolean | ClassCountOutputTypeCountForumThreadsArgs;
    requestsFrom?: boolean | ClassCountOutputTypeCountRequestsFromArgs;
    requestsTo?: boolean | ClassCountOutputTypeCountRequestsToArgs;
};
export type ClassCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassCountOutputTypeSelect<ExtArgs> | null;
};
export type ClassCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProfileWhereInput;
};
export type ClassCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
};
export type ClassCountOutputTypeCountClassSubjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassSubjectWhereInput;
};
export type ClassCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
export type ClassCountOutputTypeCountContributionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContributionWhereInput;
};
export type ClassCountOutputTypeCountForumThreadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumThreadWhereInput;
};
export type ClassCountOutputTypeCountRequestsFromArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
};
export type ClassCountOutputTypeCountRequestsToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
};
export type ClassSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    label?: boolean;
    cycle?: boolean;
    level?: boolean;
    series?: boolean;
    position?: boolean;
    students?: boolean | Prisma.Class$studentsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.Class$enrollmentsArgs<ExtArgs>;
    classSubjects?: boolean | Prisma.Class$classSubjectsArgs<ExtArgs>;
    events?: boolean | Prisma.Class$eventsArgs<ExtArgs>;
    contributions?: boolean | Prisma.Class$contributionsArgs<ExtArgs>;
    forumThreads?: boolean | Prisma.Class$forumThreadsArgs<ExtArgs>;
    requestsFrom?: boolean | Prisma.Class$requestsFromArgs<ExtArgs>;
    requestsTo?: boolean | Prisma.Class$requestsToArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["class"]>;
export type ClassSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    label?: boolean;
    cycle?: boolean;
    level?: boolean;
    series?: boolean;
    position?: boolean;
}, ExtArgs["result"]["class"]>;
export type ClassSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    label?: boolean;
    cycle?: boolean;
    level?: boolean;
    series?: boolean;
    position?: boolean;
}, ExtArgs["result"]["class"]>;
export type ClassSelectScalar = {
    id?: boolean;
    code?: boolean;
    label?: boolean;
    cycle?: boolean;
    level?: boolean;
    series?: boolean;
    position?: boolean;
};
export type ClassOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "label" | "cycle" | "level" | "series" | "position", ExtArgs["result"]["class"]>;
export type ClassInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    students?: boolean | Prisma.Class$studentsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.Class$enrollmentsArgs<ExtArgs>;
    classSubjects?: boolean | Prisma.Class$classSubjectsArgs<ExtArgs>;
    events?: boolean | Prisma.Class$eventsArgs<ExtArgs>;
    contributions?: boolean | Prisma.Class$contributionsArgs<ExtArgs>;
    forumThreads?: boolean | Prisma.Class$forumThreadsArgs<ExtArgs>;
    requestsFrom?: boolean | Prisma.Class$requestsFromArgs<ExtArgs>;
    requestsTo?: boolean | Prisma.Class$requestsToArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ClassIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ClassIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ClassPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Class";
    objects: {
        students: Prisma.$StudentProfilePayload<ExtArgs>[];
        enrollments: Prisma.$ClassEnrollmentPayload<ExtArgs>[];
        classSubjects: Prisma.$ClassSubjectPayload<ExtArgs>[];
        events: Prisma.$EventPayload<ExtArgs>[];
        contributions: Prisma.$ContributionPayload<ExtArgs>[];
        forumThreads: Prisma.$ForumThreadPayload<ExtArgs>[];
        requestsFrom: Prisma.$ClassChangeRequestPayload<ExtArgs>[];
        requestsTo: Prisma.$ClassChangeRequestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        label: string;
        cycle: $Enums.SchoolCycle;
        level: $Enums.ClassLevel;
        series: $Enums.ClassSeries | null;
        position: number;
    }, ExtArgs["result"]["class"]>;
    composites: {};
};
export type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClassPayload, S>;
export type ClassCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClassCountAggregateInputType | true;
};
export interface ClassDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Class'];
        meta: {
            name: 'Class';
        };
    };
    findUnique<T extends ClassFindUniqueArgs>(args: Prisma.SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClassFindFirstArgs>(args?: Prisma.SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClassFindManyArgs>(args?: Prisma.SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClassCreateArgs>(args: Prisma.SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClassCreateManyArgs>(args?: Prisma.SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClassDeleteArgs>(args: Prisma.SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClassUpdateArgs>(args: Prisma.SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClassDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClassUpdateManyArgs>(args: Prisma.SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClassUpsertArgs>(args: Prisma.SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClassCountArgs>(args?: Prisma.Subset<T, ClassCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClassCountAggregateOutputType> : number>;
    aggregate<T extends ClassAggregateArgs>(args: Prisma.Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>;
    groupBy<T extends ClassGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClassGroupByArgs['orderBy'];
    } : {
        orderBy?: ClassGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClassFieldRefs;
}
export interface Prisma__ClassClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    students<T extends Prisma.Class$studentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrollments<T extends Prisma.Class$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    classSubjects<T extends Prisma.Class$classSubjectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$classSubjectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    events<T extends Prisma.Class$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    contributions<T extends Prisma.Class$contributionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$contributionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    forumThreads<T extends Prisma.Class$forumThreadsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$forumThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    requestsFrom<T extends Prisma.Class$requestsFromArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$requestsFromArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    requestsTo<T extends Prisma.Class$requestsToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Class$requestsToArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClassFieldRefs {
    readonly id: Prisma.FieldRef<"Class", 'String'>;
    readonly code: Prisma.FieldRef<"Class", 'String'>;
    readonly label: Prisma.FieldRef<"Class", 'String'>;
    readonly cycle: Prisma.FieldRef<"Class", 'SchoolCycle'>;
    readonly level: Prisma.FieldRef<"Class", 'ClassLevel'>;
    readonly series: Prisma.FieldRef<"Class", 'ClassSeries'>;
    readonly position: Prisma.FieldRef<"Class", 'Int'>;
}
export type ClassFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where: Prisma.ClassWhereUniqueInput;
};
export type ClassFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where: Prisma.ClassWhereUniqueInput;
};
export type ClassFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithRelationInput | Prisma.ClassOrderByWithRelationInput[];
    cursor?: Prisma.ClassWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScalarFieldEnum | Prisma.ClassScalarFieldEnum[];
};
export type ClassFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithRelationInput | Prisma.ClassOrderByWithRelationInput[];
    cursor?: Prisma.ClassWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScalarFieldEnum | Prisma.ClassScalarFieldEnum[];
};
export type ClassFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithRelationInput | Prisma.ClassOrderByWithRelationInput[];
    cursor?: Prisma.ClassWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScalarFieldEnum | Prisma.ClassScalarFieldEnum[];
};
export type ClassCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassCreateInput, Prisma.ClassUncheckedCreateInput>;
};
export type ClassCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClassCreateManyInput | Prisma.ClassCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    data: Prisma.ClassCreateManyInput | Prisma.ClassCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassUpdateInput, Prisma.ClassUncheckedUpdateInput>;
    where: Prisma.ClassWhereUniqueInput;
};
export type ClassUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClassUpdateManyMutationInput, Prisma.ClassUncheckedUpdateManyInput>;
    where?: Prisma.ClassWhereInput;
    limit?: number;
};
export type ClassUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassUpdateManyMutationInput, Prisma.ClassUncheckedUpdateManyInput>;
    where?: Prisma.ClassWhereInput;
    limit?: number;
};
export type ClassUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where: Prisma.ClassWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassCreateInput, Prisma.ClassUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClassUpdateInput, Prisma.ClassUncheckedUpdateInput>;
};
export type ClassDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where: Prisma.ClassWhereUniqueInput;
};
export type ClassDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassWhereInput;
    limit?: number;
};
export type Class$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProfileScalarFieldEnum | Prisma.StudentProfileScalarFieldEnum[];
};
export type Class$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassEnrollmentScalarFieldEnum | Prisma.ClassEnrollmentScalarFieldEnum[];
};
export type Class$classSubjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithRelationInput | Prisma.ClassSubjectOrderByWithRelationInput[];
    cursor?: Prisma.ClassSubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassSubjectScalarFieldEnum | Prisma.ClassSubjectScalarFieldEnum[];
};
export type Class$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
export type Class$contributionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionSelect<ExtArgs> | null;
    omit?: Prisma.ContributionOmit<ExtArgs> | null;
    include?: Prisma.ContributionInclude<ExtArgs> | null;
    where?: Prisma.ContributionWhereInput;
    orderBy?: Prisma.ContributionOrderByWithRelationInput | Prisma.ContributionOrderByWithRelationInput[];
    cursor?: Prisma.ContributionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContributionScalarFieldEnum | Prisma.ContributionScalarFieldEnum[];
};
export type Class$forumThreadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumThreadScalarFieldEnum | Prisma.ForumThreadScalarFieldEnum[];
};
export type Class$requestsFromArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithRelationInput | Prisma.ClassChangeRequestOrderByWithRelationInput[];
    cursor?: Prisma.ClassChangeRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassChangeRequestScalarFieldEnum | Prisma.ClassChangeRequestScalarFieldEnum[];
};
export type Class$requestsToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithRelationInput | Prisma.ClassChangeRequestOrderByWithRelationInput[];
    cursor?: Prisma.ClassChangeRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassChangeRequestScalarFieldEnum | Prisma.ClassChangeRequestScalarFieldEnum[];
};
export type ClassDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSelect<ExtArgs> | null;
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    include?: Prisma.ClassInclude<ExtArgs> | null;
};
