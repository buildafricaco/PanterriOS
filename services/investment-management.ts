import { CreateInvestmentReq, CreateInvestmentRes } from '@/interface';
import API from '@/services/axios';

export const createInvestment = async (
  payload: CreateInvestmentReq,
): Promise<CreateInvestmentRes> => {
  const formData = new FormData();

  // Append basic fields
  formData.append('propertyName', payload.propertyName);
  formData.append('propertyType', payload.propertyType);
  formData.append('state', payload.state);
  formData.append('city', payload.city);
  formData.append('fullAddress', payload.fullAddress);
  formData.append('propertyDescription', payload.propertyDescription);
  formData.append('targetAmount', payload.targetAmount.toString());
  formData.append(
    'minimumInvestmentAmount',
    payload.minimumInvestmentAmount.toString(),
  );
  formData.append(
    'returnDistributionSchedule',
    payload.returnDistributionSchedule,
  );
  formData.append('duration', payload.duration.toString());
  formData.append(
    'expectedReturnPercentage',
    payload.expectedReturnPercentage.toString(),
  );
  formData.append('riskRating', payload.riskRating);
  formData.append(
    'investmentPublicationStatus',
    payload.investmentPublicationStatus,
  );

  // Append optional fields
  if (payload.propertyValue !== undefined) {
    formData.append('propertyValue', payload.propertyValue.toString());
  }
  if (payload.expectedRoi !== undefined) {
    formData.append('expectedRoi', payload.expectedRoi.toString());
  }
  if (payload.propertySizeSqm !== undefined) {
    formData.append('propertySizeSqm', payload.propertySizeSqm.toString());
  }
  if (payload.propertyUnit) {
    formData.append('propertyUnit', payload.propertyUnit);
  }

  // Append key highlights as JSON string array
  if (payload.keyHighlights && payload.keyHighlights.length > 0) {
    formData.append('keyHighlights', JSON.stringify(payload.keyHighlights));
  }

  // Append project milestones as JSON string array
  formData.append('projectMilestones', JSON.stringify(payload.projectMilestones));

  // Append document visibility if provided
  if (payload.documentVisibility && payload.documentVisibility.length > 0) {
    formData.append(
      'documentVisibility',
      JSON.stringify(payload.documentVisibility),
    );
  }

  // Append cover image index if provided
  if (payload.coverImageIndex !== undefined) {
    formData.append('coverImageIndex', payload.coverImageIndex.toString());
  }

  // Append property images
  payload.propertyImages.forEach((file) => {
    formData.append('propertyImages', file);
  });

  // Append property documents
  payload.propertyDocuments.forEach((file) => {
    formData.append('propertyDocuments', file);
  });

  const { data } = await API.post(
    '/investments/admin/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
