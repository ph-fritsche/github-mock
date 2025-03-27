// Auto-generated -- do not modify
import * as Schema from '@octokit/graphql-schema'

export type StoreObjectMap = {
    'ActorLocation': Schema.ActorLocation
    'AddedToMergeQueueEvent': Schema.AddedToMergeQueueEvent
    'AddedToProjectEvent': Schema.AddedToProjectEvent
    'App': Schema.App
    'AssignedEvent': Schema.AssignedEvent
    'AutoMergeDisabledEvent': Schema.AutoMergeDisabledEvent
    'AutoMergeEnabledEvent': Schema.AutoMergeEnabledEvent
    'AutoMergeRequest': Schema.AutoMergeRequest
    'AutoRebaseEnabledEvent': Schema.AutoRebaseEnabledEvent
    'AutoSquashEnabledEvent': Schema.AutoSquashEnabledEvent
    'AutomaticBaseChangeFailedEvent': Schema.AutomaticBaseChangeFailedEvent
    'AutomaticBaseChangeSucceededEvent': Schema.AutomaticBaseChangeSucceededEvent
    'BaseRefChangedEvent': Schema.BaseRefChangedEvent
    'BaseRefDeletedEvent': Schema.BaseRefDeletedEvent
    'BaseRefForcePushedEvent': Schema.BaseRefForcePushedEvent
    'Blame': Schema.Blame
    'BlameRange': Schema.BlameRange
    'Blob': Schema.Blob
    'Bot': Schema.Bot
    'BranchProtectionRule': Schema.BranchProtectionRule
    'BranchProtectionRuleConflict': Schema.BranchProtectionRuleConflict
    'BypassForcePushAllowance': Schema.BypassForcePushAllowance
    'BypassPullRequestAllowance': Schema.BypassPullRequestAllowance
    'CVSS': Schema.Cvss
    'CWE': Schema.Cwe
    'CheckAnnotation': Schema.CheckAnnotation
    'CheckAnnotationPosition': Schema.CheckAnnotationPosition
    'CheckAnnotationSpan': Schema.CheckAnnotationSpan
    'CheckRun': Schema.CheckRun
    'CheckRunStateCount': Schema.CheckRunStateCount
    'CheckStep': Schema.CheckStep
    'CheckSuite': Schema.CheckSuite
    'ClosedEvent': Schema.ClosedEvent
    'CodeOfConduct': Schema.CodeOfConduct
    'CodeScanningTool': Schema.CodeScanningTool
    'CommentDeletedEvent': Schema.CommentDeletedEvent
    'Commit': Schema.Commit
    'CommitComment': Schema.CommitComment
    'CommitCommentThread': Schema.CommitCommentThread
    'CommitContributionsByRepository': Schema.CommitContributionsByRepository
    'Comparison': Schema.Comparison
    'ConnectedEvent': Schema.ConnectedEvent
    'ContributingGuidelines': Schema.ContributingGuidelines
    'ContributionCalendar': Schema.ContributionCalendar
    'ContributionCalendarDay': Schema.ContributionCalendarDay
    'ContributionCalendarMonth': Schema.ContributionCalendarMonth
    'ContributionCalendarWeek': Schema.ContributionCalendarWeek
    'ContributionsCollection': Schema.ContributionsCollection
    'ConvertToDraftEvent': Schema.ConvertToDraftEvent
    'ConvertedNoteToIssueEvent': Schema.ConvertedNoteToIssueEvent
    'ConvertedToDiscussionEvent': Schema.ConvertedToDiscussionEvent
    'CopilotEndpoints': Schema.CopilotEndpoints
    'CreatedCommitContribution': Schema.CreatedCommitContribution
    'CreatedIssueContribution': Schema.CreatedIssueContribution
    'CreatedPullRequestContribution': Schema.CreatedPullRequestContribution
    'CreatedPullRequestReviewContribution': Schema.CreatedPullRequestReviewContribution
    'CreatedRepositoryContribution': Schema.CreatedRepositoryContribution
    'CrossReferencedEvent': Schema.CrossReferencedEvent
    'DemilestonedEvent': Schema.DemilestonedEvent
    'DependabotUpdate': Schema.DependabotUpdate
    'DependabotUpdateError': Schema.DependabotUpdateError
    'DependencyGraphDependency': Schema.DependencyGraphDependency
    'DependencyGraphManifest': Schema.DependencyGraphManifest
    'DeployKey': Schema.DeployKey
    'DeployedEvent': Schema.DeployedEvent
    'Deployment': Schema.Deployment
    'DeploymentEnvironmentChangedEvent': Schema.DeploymentEnvironmentChangedEvent
    'DeploymentProtectionRule': Schema.DeploymentProtectionRule
    'DeploymentRequest': Schema.DeploymentRequest
    'DeploymentReview': Schema.DeploymentReview
    'DeploymentStatus': Schema.DeploymentStatus
    'DisconnectedEvent': Schema.DisconnectedEvent
    'Discussion': Schema.Discussion
    'DiscussionCategory': Schema.DiscussionCategory
    'DiscussionComment': Schema.DiscussionComment
    'DiscussionPoll': Schema.DiscussionPoll
    'DiscussionPollOption': Schema.DiscussionPollOption
    'DraftIssue': Schema.DraftIssue
    'Enterprise': Schema.Enterprise
    'EnterpriseAdministratorInvitation': Schema.EnterpriseAdministratorInvitation
    'EnterpriseBillingInfo': Schema.EnterpriseBillingInfo
    'EnterpriseIdentityProvider': Schema.EnterpriseIdentityProvider
    'EnterpriseMemberInvitation': Schema.EnterpriseMemberInvitation
    'EnterpriseOwnerInfo': Schema.EnterpriseOwnerInfo
    'EnterpriseRepositoryInfo': Schema.EnterpriseRepositoryInfo
    'EnterpriseServerInstallation': Schema.EnterpriseServerInstallation
    'EnterpriseServerUserAccount': Schema.EnterpriseServerUserAccount
    'EnterpriseServerUserAccountEmail': Schema.EnterpriseServerUserAccountEmail
    'EnterpriseServerUserAccountsUpload': Schema.EnterpriseServerUserAccountsUpload
    'EnterpriseUserAccount': Schema.EnterpriseUserAccount
    'Environment': Schema.Environment
    'ExternalIdentity': Schema.ExternalIdentity
    'ExternalIdentityAttribute': Schema.ExternalIdentityAttribute
    'ExternalIdentitySamlAttributes': Schema.ExternalIdentitySamlAttributes
    'ExternalIdentityScimAttributes': Schema.ExternalIdentityScimAttributes
    'FundingLink': Schema.FundingLink
    'GenericHovercardContext': Schema.GenericHovercardContext
    'Gist': Schema.Gist
    'GistComment': Schema.GistComment
    'GistFile': Schema.GistFile
    'GitActor': Schema.GitActor
    'GitHubMetadata': Schema.GitHubMetadata
    'GpgSignature': Schema.GpgSignature
    'HeadRefDeletedEvent': Schema.HeadRefDeletedEvent
    'HeadRefForcePushedEvent': Schema.HeadRefForcePushedEvent
    'HeadRefRestoredEvent': Schema.HeadRefRestoredEvent
    'Hovercard': Schema.Hovercard
    'IpAllowListEntry': Schema.IpAllowListEntry
    'Issue': Schema.Issue
    'IssueComment': Schema.IssueComment
    'IssueContributionsByRepository': Schema.IssueContributionsByRepository
    'IssueTemplate': Schema.IssueTemplate
    'JoinedGitHubContribution': Schema.JoinedGitHubContribution
    'Label': Schema.Label
    'LabeledEvent': Schema.LabeledEvent
    'Language': Schema.Language
    'License': Schema.License
    'LicenseRule': Schema.LicenseRule
    'LinkedBranch': Schema.LinkedBranch
    'LockedEvent': Schema.LockedEvent
    'Mannequin': Schema.Mannequin
    'MarkedAsDuplicateEvent': Schema.MarkedAsDuplicateEvent
    'MarketplaceCategory': Schema.MarketplaceCategory
    'MarketplaceListing': Schema.MarketplaceListing
    'MemberFeatureRequestNotification': Schema.MemberFeatureRequestNotification
    'MembersCanDeleteReposClearAuditEntry': Schema.MembersCanDeleteReposClearAuditEntry
    'MembersCanDeleteReposDisableAuditEntry': Schema.MembersCanDeleteReposDisableAuditEntry
    'MembersCanDeleteReposEnableAuditEntry': Schema.MembersCanDeleteReposEnableAuditEntry
    'MentionedEvent': Schema.MentionedEvent
    'MergeQueue': Schema.MergeQueue
    'MergeQueueConfiguration': Schema.MergeQueueConfiguration
    'MergeQueueEntry': Schema.MergeQueueEntry
    'MergedEvent': Schema.MergedEvent
    'MigrationSource': Schema.MigrationSource
    'Milestone': Schema.Milestone
    'MilestonedEvent': Schema.MilestonedEvent
    'MovedColumnsInProjectEvent': Schema.MovedColumnsInProjectEvent
    'OIDCProvider': Schema.OidcProvider
    'OauthApplicationCreateAuditEntry': Schema.OauthApplicationCreateAuditEntry
    'OrgAddBillingManagerAuditEntry': Schema.OrgAddBillingManagerAuditEntry
    'OrgAddMemberAuditEntry': Schema.OrgAddMemberAuditEntry
    'OrgBlockUserAuditEntry': Schema.OrgBlockUserAuditEntry
    'OrgConfigDisableCollaboratorsOnlyAuditEntry': Schema.OrgConfigDisableCollaboratorsOnlyAuditEntry
    'OrgConfigEnableCollaboratorsOnlyAuditEntry': Schema.OrgConfigEnableCollaboratorsOnlyAuditEntry
    'OrgCreateAuditEntry': Schema.OrgCreateAuditEntry
    'OrgDisableOauthAppRestrictionsAuditEntry': Schema.OrgDisableOauthAppRestrictionsAuditEntry
    'OrgDisableSamlAuditEntry': Schema.OrgDisableSamlAuditEntry
    'OrgDisableTwoFactorRequirementAuditEntry': Schema.OrgDisableTwoFactorRequirementAuditEntry
    'OrgEnableOauthAppRestrictionsAuditEntry': Schema.OrgEnableOauthAppRestrictionsAuditEntry
    'OrgEnableSamlAuditEntry': Schema.OrgEnableSamlAuditEntry
    'OrgEnableTwoFactorRequirementAuditEntry': Schema.OrgEnableTwoFactorRequirementAuditEntry
    'OrgInviteMemberAuditEntry': Schema.OrgInviteMemberAuditEntry
    'OrgInviteToBusinessAuditEntry': Schema.OrgInviteToBusinessAuditEntry
    'OrgOauthAppAccessApprovedAuditEntry': Schema.OrgOauthAppAccessApprovedAuditEntry
    'OrgOauthAppAccessBlockedAuditEntry': Schema.OrgOauthAppAccessBlockedAuditEntry
    'OrgOauthAppAccessDeniedAuditEntry': Schema.OrgOauthAppAccessDeniedAuditEntry
    'OrgOauthAppAccessRequestedAuditEntry': Schema.OrgOauthAppAccessRequestedAuditEntry
    'OrgOauthAppAccessUnblockedAuditEntry': Schema.OrgOauthAppAccessUnblockedAuditEntry
    'OrgRemoveBillingManagerAuditEntry': Schema.OrgRemoveBillingManagerAuditEntry
    'OrgRemoveMemberAuditEntry': Schema.OrgRemoveMemberAuditEntry
    'OrgRemoveOutsideCollaboratorAuditEntry': Schema.OrgRemoveOutsideCollaboratorAuditEntry
    'OrgRestoreMemberAuditEntry': Schema.OrgRestoreMemberAuditEntry
    'OrgRestoreMemberMembershipOrganizationAuditEntryData': Schema.OrgRestoreMemberMembershipOrganizationAuditEntryData
    'OrgRestoreMemberMembershipRepositoryAuditEntryData': Schema.OrgRestoreMemberMembershipRepositoryAuditEntryData
    'OrgRestoreMemberMembershipTeamAuditEntryData': Schema.OrgRestoreMemberMembershipTeamAuditEntryData
    'OrgUnblockUserAuditEntry': Schema.OrgUnblockUserAuditEntry
    'OrgUpdateDefaultRepositoryPermissionAuditEntry': Schema.OrgUpdateDefaultRepositoryPermissionAuditEntry
    'OrgUpdateMemberAuditEntry': Schema.OrgUpdateMemberAuditEntry
    'OrgUpdateMemberRepositoryCreationPermissionAuditEntry': Schema.OrgUpdateMemberRepositoryCreationPermissionAuditEntry
    'OrgUpdateMemberRepositoryInvitationPermissionAuditEntry': Schema.OrgUpdateMemberRepositoryInvitationPermissionAuditEntry
    'Organization': Schema.Organization
    'OrganizationIdentityProvider': Schema.OrganizationIdentityProvider
    'OrganizationInvitation': Schema.OrganizationInvitation
    'OrganizationMigration': Schema.OrganizationMigration
    'OrganizationTeamsHovercardContext': Schema.OrganizationTeamsHovercardContext
    'OrganizationsHovercardContext': Schema.OrganizationsHovercardContext
    'Package': Schema.Package
    'PackageFile': Schema.PackageFile
    'PackageStatistics': Schema.PackageStatistics
    'PackageTag': Schema.PackageTag
    'PackageVersion': Schema.PackageVersion
    'PackageVersionStatistics': Schema.PackageVersionStatistics
    'PageInfo': Schema.PageInfo
    'PermissionSource': Schema.PermissionSource
    'PinnedDiscussion': Schema.PinnedDiscussion
    'PinnedEnvironment': Schema.PinnedEnvironment
    'PinnedEvent': Schema.PinnedEvent
    'PinnedIssue': Schema.PinnedIssue
    'PrivateRepositoryForkingDisableAuditEntry': Schema.PrivateRepositoryForkingDisableAuditEntry
    'PrivateRepositoryForkingEnableAuditEntry': Schema.PrivateRepositoryForkingEnableAuditEntry
    'ProfileItemShowcase': Schema.ProfileItemShowcase
    'Project': Schema.Project
    'ProjectCard': Schema.ProjectCard
    'ProjectColumn': Schema.ProjectColumn
    'ProjectProgress': Schema.ProjectProgress
    'ProjectV2': Schema.ProjectV2
    'ProjectV2Field': Schema.ProjectV2Field
    'ProjectV2Item': Schema.ProjectV2Item
    'ProjectV2ItemFieldDateValue': Schema.ProjectV2ItemFieldDateValue
    'ProjectV2ItemFieldIterationValue': Schema.ProjectV2ItemFieldIterationValue
    'ProjectV2ItemFieldLabelValue': Schema.ProjectV2ItemFieldLabelValue
    'ProjectV2ItemFieldMilestoneValue': Schema.ProjectV2ItemFieldMilestoneValue
    'ProjectV2ItemFieldNumberValue': Schema.ProjectV2ItemFieldNumberValue
    'ProjectV2ItemFieldPullRequestValue': Schema.ProjectV2ItemFieldPullRequestValue
    'ProjectV2ItemFieldRepositoryValue': Schema.ProjectV2ItemFieldRepositoryValue
    'ProjectV2ItemFieldReviewerValue': Schema.ProjectV2ItemFieldReviewerValue
    'ProjectV2ItemFieldSingleSelectValue': Schema.ProjectV2ItemFieldSingleSelectValue
    'ProjectV2ItemFieldTextValue': Schema.ProjectV2ItemFieldTextValue
    'ProjectV2ItemFieldUserValue': Schema.ProjectV2ItemFieldUserValue
    'ProjectV2IterationField': Schema.ProjectV2IterationField
    'ProjectV2IterationFieldConfiguration': Schema.ProjectV2IterationFieldConfiguration
    'ProjectV2IterationFieldIteration': Schema.ProjectV2IterationFieldIteration
    'ProjectV2SingleSelectField': Schema.ProjectV2SingleSelectField
    'ProjectV2SingleSelectFieldOption': Schema.ProjectV2SingleSelectFieldOption
    'ProjectV2SortBy': Schema.ProjectV2SortBy
    'ProjectV2SortByField': Schema.ProjectV2SortByField
    'ProjectV2StatusUpdate': Schema.ProjectV2StatusUpdate
    'ProjectV2View': Schema.ProjectV2View
    'ProjectV2Workflow': Schema.ProjectV2Workflow
    'PropertyTargetDefinition': Schema.PropertyTargetDefinition
    'PublicKey': Schema.PublicKey
    'PullRequest': Schema.PullRequest
    'PullRequestChangedFile': Schema.PullRequestChangedFile
    'PullRequestCommit': Schema.PullRequestCommit
    'PullRequestCommitCommentThread': Schema.PullRequestCommitCommentThread
    'PullRequestContributionsByRepository': Schema.PullRequestContributionsByRepository
    'PullRequestReview': Schema.PullRequestReview
    'PullRequestReviewComment': Schema.PullRequestReviewComment
    'PullRequestReviewContributionsByRepository': Schema.PullRequestReviewContributionsByRepository
    'PullRequestReviewThread': Schema.PullRequestReviewThread
    'PullRequestRevisionMarker': Schema.PullRequestRevisionMarker
    'PullRequestTemplate': Schema.PullRequestTemplate
    'PullRequestThread': Schema.PullRequestThread
    'Push': Schema.Push
    'PushAllowance': Schema.PushAllowance
    'RateLimit': Schema.RateLimit
    'Reaction': Schema.Reaction
    'ReactionGroup': Schema.ReactionGroup
    'ReadyForReviewEvent': Schema.ReadyForReviewEvent
    'Ref': Schema.Ref
    'RefNameConditionTarget': Schema.RefNameConditionTarget
    'RefUpdateRule': Schema.RefUpdateRule
    'ReferencedEvent': Schema.ReferencedEvent
    'Release': Schema.Release
    'ReleaseAsset': Schema.ReleaseAsset
    'RemovedFromMergeQueueEvent': Schema.RemovedFromMergeQueueEvent
    'RemovedFromProjectEvent': Schema.RemovedFromProjectEvent
    'RenamedTitleEvent': Schema.RenamedTitleEvent
    'ReopenedEvent': Schema.ReopenedEvent
    'RepoAccessAuditEntry': Schema.RepoAccessAuditEntry
    'RepoAddMemberAuditEntry': Schema.RepoAddMemberAuditEntry
    'RepoAddTopicAuditEntry': Schema.RepoAddTopicAuditEntry
    'RepoArchivedAuditEntry': Schema.RepoArchivedAuditEntry
    'RepoChangeMergeSettingAuditEntry': Schema.RepoChangeMergeSettingAuditEntry
    'RepoConfigDisableAnonymousGitAccessAuditEntry': Schema.RepoConfigDisableAnonymousGitAccessAuditEntry
    'RepoConfigDisableCollaboratorsOnlyAuditEntry': Schema.RepoConfigDisableCollaboratorsOnlyAuditEntry
    'RepoConfigDisableContributorsOnlyAuditEntry': Schema.RepoConfigDisableContributorsOnlyAuditEntry
    'RepoConfigDisableSockpuppetDisallowedAuditEntry': Schema.RepoConfigDisableSockpuppetDisallowedAuditEntry
    'RepoConfigEnableAnonymousGitAccessAuditEntry': Schema.RepoConfigEnableAnonymousGitAccessAuditEntry
    'RepoConfigEnableCollaboratorsOnlyAuditEntry': Schema.RepoConfigEnableCollaboratorsOnlyAuditEntry
    'RepoConfigEnableContributorsOnlyAuditEntry': Schema.RepoConfigEnableContributorsOnlyAuditEntry
    'RepoConfigEnableSockpuppetDisallowedAuditEntry': Schema.RepoConfigEnableSockpuppetDisallowedAuditEntry
    'RepoConfigLockAnonymousGitAccessAuditEntry': Schema.RepoConfigLockAnonymousGitAccessAuditEntry
    'RepoConfigUnlockAnonymousGitAccessAuditEntry': Schema.RepoConfigUnlockAnonymousGitAccessAuditEntry
    'RepoCreateAuditEntry': Schema.RepoCreateAuditEntry
    'RepoDestroyAuditEntry': Schema.RepoDestroyAuditEntry
    'RepoRemoveMemberAuditEntry': Schema.RepoRemoveMemberAuditEntry
    'RepoRemoveTopicAuditEntry': Schema.RepoRemoveTopicAuditEntry
    'Repository': Schema.Repository
    'RepositoryCodeowners': Schema.RepositoryCodeowners
    'RepositoryCodeownersError': Schema.RepositoryCodeownersError
    'RepositoryContactLink': Schema.RepositoryContactLink
    'RepositoryIdConditionTarget': Schema.RepositoryIdConditionTarget
    'RepositoryInteractionAbility': Schema.RepositoryInteractionAbility
    'RepositoryInvitation': Schema.RepositoryInvitation
    'RepositoryMigration': Schema.RepositoryMigration
    'RepositoryNameConditionTarget': Schema.RepositoryNameConditionTarget
    'RepositoryPlanFeatures': Schema.RepositoryPlanFeatures
    'RepositoryPropertyConditionTarget': Schema.RepositoryPropertyConditionTarget
    'RepositoryRule': Schema.RepositoryRule
    'RepositoryRuleConditions': Schema.RepositoryRuleConditions
    'RepositoryRuleset': Schema.RepositoryRuleset
    'RepositoryRulesetBypassActor': Schema.RepositoryRulesetBypassActor
    'RepositoryTopic': Schema.RepositoryTopic
    'RepositoryVisibilityChangeDisableAuditEntry': Schema.RepositoryVisibilityChangeDisableAuditEntry
    'RepositoryVisibilityChangeEnableAuditEntry': Schema.RepositoryVisibilityChangeEnableAuditEntry
    'RepositoryVulnerabilityAlert': Schema.RepositoryVulnerabilityAlert
    'RequiredStatusCheckDescription': Schema.RequiredStatusCheckDescription
    'RestrictedContribution': Schema.RestrictedContribution
    'ReviewDismissalAllowance': Schema.ReviewDismissalAllowance
    'ReviewDismissedEvent': Schema.ReviewDismissedEvent
    'ReviewRequest': Schema.ReviewRequest
    'ReviewRequestRemovedEvent': Schema.ReviewRequestRemovedEvent
    'ReviewRequestedEvent': Schema.ReviewRequestedEvent
    'ReviewStatusHovercardContext': Schema.ReviewStatusHovercardContext
    'SavedReply': Schema.SavedReply
    'SecurityAdvisory': Schema.SecurityAdvisory
    'SecurityAdvisoryIdentifier': Schema.SecurityAdvisoryIdentifier
    'SecurityAdvisoryPackage': Schema.SecurityAdvisoryPackage
    'SecurityAdvisoryPackageVersion': Schema.SecurityAdvisoryPackageVersion
    'SecurityAdvisoryReference': Schema.SecurityAdvisoryReference
    'SecurityVulnerability': Schema.SecurityVulnerability
    'SmimeSignature': Schema.SmimeSignature
    'SocialAccount': Schema.SocialAccount
    'SponsorAndLifetimeValue': Schema.SponsorAndLifetimeValue
    'SponsorsActivity': Schema.SponsorsActivity
    'SponsorsGoal': Schema.SponsorsGoal
    'SponsorsListing': Schema.SponsorsListing
    'SponsorsListingFeaturedItem': Schema.SponsorsListingFeaturedItem
    'SponsorsTier': Schema.SponsorsTier
    'SponsorsTierAdminInfo': Schema.SponsorsTierAdminInfo
    'Sponsorship': Schema.Sponsorship
    'SponsorshipNewsletter': Schema.SponsorshipNewsletter
    'SshSignature': Schema.SshSignature
    'Status': Schema.Status
    'StatusCheckConfiguration': Schema.StatusCheckConfiguration
    'StatusCheckRollup': Schema.StatusCheckRollup
    'StatusContext': Schema.StatusContext
    'StatusContextStateCount': Schema.StatusContextStateCount
    'StripeConnectAccount': Schema.StripeConnectAccount
    'Submodule': Schema.Submodule
    'SubscribedEvent': Schema.SubscribedEvent
    'SuggestedReviewer': Schema.SuggestedReviewer
    'Tag': Schema.Tag
    'Team': Schema.Team
    'TeamAddMemberAuditEntry': Schema.TeamAddMemberAuditEntry
    'TeamAddRepositoryAuditEntry': Schema.TeamAddRepositoryAuditEntry
    'TeamChangeParentTeamAuditEntry': Schema.TeamChangeParentTeamAuditEntry
    'TeamDiscussion': Schema.TeamDiscussion
    'TeamDiscussionComment': Schema.TeamDiscussionComment
    'TeamRemoveMemberAuditEntry': Schema.TeamRemoveMemberAuditEntry
    'TeamRemoveRepositoryAuditEntry': Schema.TeamRemoveRepositoryAuditEntry
    'TextMatch': Schema.TextMatch
    'TextMatchHighlight': Schema.TextMatchHighlight
    'Topic': Schema.Topic
    'TransferredEvent': Schema.TransferredEvent
    'Tree': Schema.Tree
    'TreeEntry': Schema.TreeEntry
    'UnassignedEvent': Schema.UnassignedEvent
    'UnknownSignature': Schema.UnknownSignature
    'UnlabeledEvent': Schema.UnlabeledEvent
    'UnlockedEvent': Schema.UnlockedEvent
    'UnmarkedAsDuplicateEvent': Schema.UnmarkedAsDuplicateEvent
    'UnpinnedEvent': Schema.UnpinnedEvent
    'UnsubscribedEvent': Schema.UnsubscribedEvent
    'User': Schema.User
    'UserBlockedEvent': Schema.UserBlockedEvent
    'UserContentEdit': Schema.UserContentEdit
    'UserEmailMetadata': Schema.UserEmailMetadata
    'UserList': Schema.UserList
    'UserListSuggestion': Schema.UserListSuggestion
    'UserStatus': Schema.UserStatus
    'VerifiableDomain': Schema.VerifiableDomain
    'ViewerHovercardContext': Schema.ViewerHovercardContext
    'Workflow': Schema.Workflow
    'WorkflowFileReference': Schema.WorkflowFileReference
    'WorkflowRun': Schema.WorkflowRun
    'WorkflowRunFile': Schema.WorkflowRunFile
}
export const StoreObjectTypes = [
    'ActorLocation',
    'AddedToMergeQueueEvent',
    'AddedToProjectEvent',
    'App',
    'AssignedEvent',
    'AutoMergeDisabledEvent',
    'AutoMergeEnabledEvent',
    'AutoMergeRequest',
    'AutoRebaseEnabledEvent',
    'AutoSquashEnabledEvent',
    'AutomaticBaseChangeFailedEvent',
    'AutomaticBaseChangeSucceededEvent',
    'BaseRefChangedEvent',
    'BaseRefDeletedEvent',
    'BaseRefForcePushedEvent',
    'Blame',
    'BlameRange',
    'Blob',
    'Bot',
    'BranchProtectionRule',
    'BranchProtectionRuleConflict',
    'BypassForcePushAllowance',
    'BypassPullRequestAllowance',
    'CVSS',
    'CWE',
    'CheckAnnotation',
    'CheckAnnotationPosition',
    'CheckAnnotationSpan',
    'CheckRun',
    'CheckRunStateCount',
    'CheckStep',
    'CheckSuite',
    'ClosedEvent',
    'CodeOfConduct',
    'CodeScanningTool',
    'CommentDeletedEvent',
    'Commit',
    'CommitComment',
    'CommitCommentThread',
    'CommitContributionsByRepository',
    'Comparison',
    'ConnectedEvent',
    'ContributingGuidelines',
    'ContributionCalendar',
    'ContributionCalendarDay',
    'ContributionCalendarMonth',
    'ContributionCalendarWeek',
    'ContributionsCollection',
    'ConvertToDraftEvent',
    'ConvertedNoteToIssueEvent',
    'ConvertedToDiscussionEvent',
    'CopilotEndpoints',
    'CreatedCommitContribution',
    'CreatedIssueContribution',
    'CreatedPullRequestContribution',
    'CreatedPullRequestReviewContribution',
    'CreatedRepositoryContribution',
    'CrossReferencedEvent',
    'DemilestonedEvent',
    'DependabotUpdate',
    'DependabotUpdateError',
    'DependencyGraphDependency',
    'DependencyGraphManifest',
    'DeployKey',
    'DeployedEvent',
    'Deployment',
    'DeploymentEnvironmentChangedEvent',
    'DeploymentProtectionRule',
    'DeploymentRequest',
    'DeploymentReview',
    'DeploymentStatus',
    'DisconnectedEvent',
    'Discussion',
    'DiscussionCategory',
    'DiscussionComment',
    'DiscussionPoll',
    'DiscussionPollOption',
    'DraftIssue',
    'Enterprise',
    'EnterpriseAdministratorInvitation',
    'EnterpriseBillingInfo',
    'EnterpriseIdentityProvider',
    'EnterpriseMemberInvitation',
    'EnterpriseOwnerInfo',
    'EnterpriseRepositoryInfo',
    'EnterpriseServerInstallation',
    'EnterpriseServerUserAccount',
    'EnterpriseServerUserAccountEmail',
    'EnterpriseServerUserAccountsUpload',
    'EnterpriseUserAccount',
    'Environment',
    'ExternalIdentity',
    'ExternalIdentityAttribute',
    'ExternalIdentitySamlAttributes',
    'ExternalIdentityScimAttributes',
    'FundingLink',
    'GenericHovercardContext',
    'Gist',
    'GistComment',
    'GistFile',
    'GitActor',
    'GitHubMetadata',
    'GpgSignature',
    'HeadRefDeletedEvent',
    'HeadRefForcePushedEvent',
    'HeadRefRestoredEvent',
    'Hovercard',
    'IpAllowListEntry',
    'Issue',
    'IssueComment',
    'IssueContributionsByRepository',
    'IssueTemplate',
    'JoinedGitHubContribution',
    'Label',
    'LabeledEvent',
    'Language',
    'License',
    'LicenseRule',
    'LinkedBranch',
    'LockedEvent',
    'Mannequin',
    'MarkedAsDuplicateEvent',
    'MarketplaceCategory',
    'MarketplaceListing',
    'MemberFeatureRequestNotification',
    'MembersCanDeleteReposClearAuditEntry',
    'MembersCanDeleteReposDisableAuditEntry',
    'MembersCanDeleteReposEnableAuditEntry',
    'MentionedEvent',
    'MergeQueue',
    'MergeQueueConfiguration',
    'MergeQueueEntry',
    'MergedEvent',
    'MigrationSource',
    'Milestone',
    'MilestonedEvent',
    'MovedColumnsInProjectEvent',
    'OIDCProvider',
    'OauthApplicationCreateAuditEntry',
    'OrgAddBillingManagerAuditEntry',
    'OrgAddMemberAuditEntry',
    'OrgBlockUserAuditEntry',
    'OrgConfigDisableCollaboratorsOnlyAuditEntry',
    'OrgConfigEnableCollaboratorsOnlyAuditEntry',
    'OrgCreateAuditEntry',
    'OrgDisableOauthAppRestrictionsAuditEntry',
    'OrgDisableSamlAuditEntry',
    'OrgDisableTwoFactorRequirementAuditEntry',
    'OrgEnableOauthAppRestrictionsAuditEntry',
    'OrgEnableSamlAuditEntry',
    'OrgEnableTwoFactorRequirementAuditEntry',
    'OrgInviteMemberAuditEntry',
    'OrgInviteToBusinessAuditEntry',
    'OrgOauthAppAccessApprovedAuditEntry',
    'OrgOauthAppAccessBlockedAuditEntry',
    'OrgOauthAppAccessDeniedAuditEntry',
    'OrgOauthAppAccessRequestedAuditEntry',
    'OrgOauthAppAccessUnblockedAuditEntry',
    'OrgRemoveBillingManagerAuditEntry',
    'OrgRemoveMemberAuditEntry',
    'OrgRemoveOutsideCollaboratorAuditEntry',
    'OrgRestoreMemberAuditEntry',
    'OrgRestoreMemberMembershipOrganizationAuditEntryData',
    'OrgRestoreMemberMembershipRepositoryAuditEntryData',
    'OrgRestoreMemberMembershipTeamAuditEntryData',
    'OrgUnblockUserAuditEntry',
    'OrgUpdateDefaultRepositoryPermissionAuditEntry',
    'OrgUpdateMemberAuditEntry',
    'OrgUpdateMemberRepositoryCreationPermissionAuditEntry',
    'OrgUpdateMemberRepositoryInvitationPermissionAuditEntry',
    'Organization',
    'OrganizationIdentityProvider',
    'OrganizationInvitation',
    'OrganizationMigration',
    'OrganizationTeamsHovercardContext',
    'OrganizationsHovercardContext',
    'Package',
    'PackageFile',
    'PackageStatistics',
    'PackageTag',
    'PackageVersion',
    'PackageVersionStatistics',
    'PageInfo',
    'PermissionSource',
    'PinnedDiscussion',
    'PinnedEnvironment',
    'PinnedEvent',
    'PinnedIssue',
    'PrivateRepositoryForkingDisableAuditEntry',
    'PrivateRepositoryForkingEnableAuditEntry',
    'ProfileItemShowcase',
    'Project',
    'ProjectCard',
    'ProjectColumn',
    'ProjectProgress',
    'ProjectV2',
    'ProjectV2Field',
    'ProjectV2Item',
    'ProjectV2ItemFieldDateValue',
    'ProjectV2ItemFieldIterationValue',
    'ProjectV2ItemFieldLabelValue',
    'ProjectV2ItemFieldMilestoneValue',
    'ProjectV2ItemFieldNumberValue',
    'ProjectV2ItemFieldPullRequestValue',
    'ProjectV2ItemFieldRepositoryValue',
    'ProjectV2ItemFieldReviewerValue',
    'ProjectV2ItemFieldSingleSelectValue',
    'ProjectV2ItemFieldTextValue',
    'ProjectV2ItemFieldUserValue',
    'ProjectV2IterationField',
    'ProjectV2IterationFieldConfiguration',
    'ProjectV2IterationFieldIteration',
    'ProjectV2SingleSelectField',
    'ProjectV2SingleSelectFieldOption',
    'ProjectV2SortBy',
    'ProjectV2SortByField',
    'ProjectV2StatusUpdate',
    'ProjectV2View',
    'ProjectV2Workflow',
    'PropertyTargetDefinition',
    'PublicKey',
    'PullRequest',
    'PullRequestChangedFile',
    'PullRequestCommit',
    'PullRequestCommitCommentThread',
    'PullRequestContributionsByRepository',
    'PullRequestReview',
    'PullRequestReviewComment',
    'PullRequestReviewContributionsByRepository',
    'PullRequestReviewThread',
    'PullRequestRevisionMarker',
    'PullRequestTemplate',
    'PullRequestThread',
    'Push',
    'PushAllowance',
    'RateLimit',
    'Reaction',
    'ReactionGroup',
    'ReadyForReviewEvent',
    'Ref',
    'RefNameConditionTarget',
    'RefUpdateRule',
    'ReferencedEvent',
    'Release',
    'ReleaseAsset',
    'RemovedFromMergeQueueEvent',
    'RemovedFromProjectEvent',
    'RenamedTitleEvent',
    'ReopenedEvent',
    'RepoAccessAuditEntry',
    'RepoAddMemberAuditEntry',
    'RepoAddTopicAuditEntry',
    'RepoArchivedAuditEntry',
    'RepoChangeMergeSettingAuditEntry',
    'RepoConfigDisableAnonymousGitAccessAuditEntry',
    'RepoConfigDisableCollaboratorsOnlyAuditEntry',
    'RepoConfigDisableContributorsOnlyAuditEntry',
    'RepoConfigDisableSockpuppetDisallowedAuditEntry',
    'RepoConfigEnableAnonymousGitAccessAuditEntry',
    'RepoConfigEnableCollaboratorsOnlyAuditEntry',
    'RepoConfigEnableContributorsOnlyAuditEntry',
    'RepoConfigEnableSockpuppetDisallowedAuditEntry',
    'RepoConfigLockAnonymousGitAccessAuditEntry',
    'RepoConfigUnlockAnonymousGitAccessAuditEntry',
    'RepoCreateAuditEntry',
    'RepoDestroyAuditEntry',
    'RepoRemoveMemberAuditEntry',
    'RepoRemoveTopicAuditEntry',
    'Repository',
    'RepositoryCodeowners',
    'RepositoryCodeownersError',
    'RepositoryContactLink',
    'RepositoryIdConditionTarget',
    'RepositoryInteractionAbility',
    'RepositoryInvitation',
    'RepositoryMigration',
    'RepositoryNameConditionTarget',
    'RepositoryPlanFeatures',
    'RepositoryPropertyConditionTarget',
    'RepositoryRule',
    'RepositoryRuleConditions',
    'RepositoryRuleset',
    'RepositoryRulesetBypassActor',
    'RepositoryTopic',
    'RepositoryVisibilityChangeDisableAuditEntry',
    'RepositoryVisibilityChangeEnableAuditEntry',
    'RepositoryVulnerabilityAlert',
    'RequiredStatusCheckDescription',
    'RestrictedContribution',
    'ReviewDismissalAllowance',
    'ReviewDismissedEvent',
    'ReviewRequest',
    'ReviewRequestRemovedEvent',
    'ReviewRequestedEvent',
    'ReviewStatusHovercardContext',
    'SavedReply',
    'SecurityAdvisory',
    'SecurityAdvisoryIdentifier',
    'SecurityAdvisoryPackage',
    'SecurityAdvisoryPackageVersion',
    'SecurityAdvisoryReference',
    'SecurityVulnerability',
    'SmimeSignature',
    'SocialAccount',
    'SponsorAndLifetimeValue',
    'SponsorsActivity',
    'SponsorsGoal',
    'SponsorsListing',
    'SponsorsListingFeaturedItem',
    'SponsorsTier',
    'SponsorsTierAdminInfo',
    'Sponsorship',
    'SponsorshipNewsletter',
    'SshSignature',
    'Status',
    'StatusCheckConfiguration',
    'StatusCheckRollup',
    'StatusContext',
    'StatusContextStateCount',
    'StripeConnectAccount',
    'Submodule',
    'SubscribedEvent',
    'SuggestedReviewer',
    'Tag',
    'Team',
    'TeamAddMemberAuditEntry',
    'TeamAddRepositoryAuditEntry',
    'TeamChangeParentTeamAuditEntry',
    'TeamDiscussion',
    'TeamDiscussionComment',
    'TeamRemoveMemberAuditEntry',
    'TeamRemoveRepositoryAuditEntry',
    'TextMatch',
    'TextMatchHighlight',
    'Topic',
    'TransferredEvent',
    'Tree',
    'TreeEntry',
    'UnassignedEvent',
    'UnknownSignature',
    'UnlabeledEvent',
    'UnlockedEvent',
    'UnmarkedAsDuplicateEvent',
    'UnpinnedEvent',
    'UnsubscribedEvent',
    'User',
    'UserBlockedEvent',
    'UserContentEdit',
    'UserEmailMetadata',
    'UserList',
    'UserListSuggestion',
    'UserStatus',
    'VerifiableDomain',
    'ViewerHovercardContext',
    'Workflow',
    'WorkflowFileReference',
    'WorkflowRun',
    'WorkflowRunFile',
] as const
